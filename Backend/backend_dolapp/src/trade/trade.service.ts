import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto/update-trade.dto';
import { prisma } from 'prisma/prisma';
import { Currency } from 'src/currency/entities/currency.entity';
import { Prisma, Trade } from '@prisma/client';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { Console } from 'console';

@Injectable()
export class TradeService {

  async create(createTradeDto: CreateTradeDto) {
    try {
      createTradeDto.amount = createTradeDto.amountForeignCurrency * createTradeDto.exchangeRate
      const actualCurrency = await prisma.currencyRevenue.findFirst({ where: { currency: createTradeDto.currency } })
      console.log(createTradeDto.trade)
      switch (createTradeDto.trade) {
        case Trade.Venta:
          console.log(Trade.Venta)
          if (!canExecuteTrade(createTradeDto, actualCurrency)) return { status: 400, error: `Trade is not create. Amount is to big.` }
          return await processSaleOperation(createTradeDto)
        case Trade.Compra:
          console.log(Trade.Compra)
          createTradeDto.remainingForeign = createTradeDto.amountForeignCurrency
          // createTradeDto.revenue = 0
          console.log(createTradeDto.revenue + "REVENUE")
          // createTradeDto.revenue -= createTradeDto.amount
          return await prisma.exchangeRecords.create({ data: createTradeDto })
        case Trade.Retiro:
          console.log(Trade.Retiro)
          if (!canExecuteTrade(createTradeDto, actualCurrency)) return { status: 400, error: `Trade is not create. Amount is to big.` }
          createTradeDto.revenue = 0
          createTradeDto.revenue -= createTradeDto.amount
          return await prisma.exchangeRecords.create({ data: createTradeDto })
        default:
          throw new BadRequestException('Invalid trade type');
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError || error instanceof PrismaClientValidationError) {
        throw new InternalServerErrorException('The currency don´t exist. Database error')
      }
      throw error
    }
  }

  async findAll() {
    return await prisma.exchangeRecords.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} currency`;
  }

  update(id: number, updateTradeDto: UpdateTradeDto) {

  }

  remove(id: number) {
    return `This action removes a #${id} currency`;
  }
}
function canExecuteTrade(createTradeDto: CreateTradeDto, actualCurrency: Currency | null): boolean {
  if (!actualCurrency || createTradeDto.amount > actualCurrency?.amount) {
    return false
  }
  return true
}
async function processSaleOperation(createTradeDto: CreateTradeDto): Promise<CreateTradeDto> {
  return await prisma.$transaction(async prisma$t => {
    const purchases = await purchasesforSale(createTradeDto, prisma$t)

    let remainingToSell = createTradeDto.amountForeignCurrency
    let totalRevenue = 0;
    if (!purchases) {
      throw new Error(``);
    }
    for (const purchase of purchases) {
      if (remainingToSell <= 0) break
      if (purchase.remainingForeign === null) {
        throw new Error(`Purchase ${purchase.id} has invalid remaining amount`);
      }
      const amountUsed = Math.min(purchase.remainingForeign, remainingToSell);
      const revenue = amountUsed * (createTradeDto.exchangeRate - purchase.exchangeRate);

      // Actualizar compra (remainingForeign)
      await prisma$t.exchangeRecords.update({
        where: { id: purchase.id },
        data: { remainingForeign: purchase.remainingForeign - amountUsed }
      });

      totalRevenue += revenue;
      remainingToSell -= amountUsed;
    }
    createTradeDto.revenue = totalRevenue
    return createTradeDto
  })
}
async function purchasesforSale(createTradeDto: CreateTradeDto, prisma$t: Prisma.TransactionClient) {
  // Se elijen todas las compras de una determinada moneda, ordenandos los registros de los más antiguos a los más recientes. 
  try {
    const currency = createTradeDto.currency
    const purchases = await prisma$t.exchangeRecords.findMany({
      where: {
        trade: "Compra",
        currency,
        remainingForeign: { gt: 0 }
      },
      orderBy: { date: "asc" }
    });
    if (!purchases.length) {
      throw new Error('The purchases isn´t insufficient')
    }
    return purchases
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError || error instanceof PrismaClientValidationError) {
      throw new InternalServerErrorException("The trade don´t exist. Database error")
    }
    throw error
  }
}