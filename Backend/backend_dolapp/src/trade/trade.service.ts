import { Injectable } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto/update-trade.dto';
import { prisma } from 'prisma/prisma';
import { Currency } from '@prisma/client';
import { error } from 'console';

@Injectable()
export class TradeService {
  async checkTrade(createTradeDto: CreateTradeDto): Promise<boolean> {
    const actualCurrency = await prisma.currencyRevenue.findFirst({ where: { currency: createTradeDto.currency } })
    if (actualCurrency == null || createTradeDto.amount > actualCurrency?.amount) {
      return false
    }
    return true
  }
  async create(createTradeDto: CreateTradeDto) {
    createTradeDto.amount = createTradeDto.amountForeignCurrency * createTradeDto.exchangeRate
    if (createTradeDto.trade === "Venta") { //{ status: 400, error: 'Bad Request' }
      if (!await this.checkTrade(createTradeDto)) return {status:400, error:`Trade is not create. Amount is to big.`}
      createTradeDto = await isSell(createTradeDto)
    } else if (createTradeDto.trade === "Compra") {
      createTradeDto.remainingForeign = createTradeDto.amountForeignCurrency
      // createTradeDto.revenue = 0
      // createTradeDto.revenue -= createTradeDto.amount
    } else {
      if (!await this.checkTrade(createTradeDto)) return {status:400, error:`Trade is not create. Amount is to big.`}
      createTradeDto.revenue = 0
      createTradeDto.revenue -= createTradeDto.amount
    }
    return await prisma.exchangeRecords.create({ data: createTradeDto })
  }

  async findAll() {
    //await prisma.currencyRevenue.create({data:{currency:"ARS",amount:100000000000}})
    // await prisma.currencyRevenue.deleteMany()
    // await prisma.exchangeRecords.deleteMany()
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

async function isSell(createTradeDto: CreateTradeDto): Promise<CreateTradeDto> {
  // Se elijen todas las compras de una determinada moneda, ordenandos los registros de los más antiguos a los más recientes. 
  const currency = createTradeDto.currency
  const purchases = await prisma.exchangeRecords.findMany({
    where: {
      trade: "Compra",
      currency,
      remainingForeign: { gt: 0 }
    },
    orderBy: { date: "asc" }
  });
  let remainingToSell = createTradeDto.amountForeignCurrency
  let totalRevenue = 0;

  for (const purchase of purchases) {
    if (remainingToSell <= 0) break

    const amountUsed = Math.min(purchase.remainingForeign!, remainingToSell);
    const revenue = amountUsed * (createTradeDto.exchangeRate - purchase.exchangeRate);

    // Actualizar compra (remainingForeign)
    await prisma.exchangeRecords.update({
      where: { id: purchase.id },
      data: { remainingForeign: purchase.remainingForeign! - amountUsed }
    });

    totalRevenue += revenue;
    remainingToSell -= amountUsed;
  }
  createTradeDto.revenue = totalRevenue
  return createTradeDto
}