import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency, Trade } from '@prisma/client';
import { prisma } from 'prisma/prisma';
import { Currency as CurrencyObject } from './entities/currency.entity';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';

@Injectable()
export class CurrencyService {
  // CRUD functions
  async create(createCurrencyDto: CreateCurrencyDto) {
    try {
      const createCurrency = await prisma.currencyRevenue.create({ data: createCurrencyDto })
      return { status: 200, body: createCurrency }
    } catch {
      return { status: 505, message: 'Error del servidor' }
    }
  }

  findAll() {
    return `This action returns all currency`;
  }

  findOne(id: number) {
    return `This action returns a #${id} currency`;
  }
  // Update
  async update(currency: Currency, updateCurrencyDto: UpdateCurrencyDto, trade: Trade) {
    try {
      if (updateCurrencyDto.amount == null || updateCurrencyDto.currency == null) return { status: 400, message: `Bad request` }
      const actualCurrency = await prisma.currencyRevenue.findFirst({ where: { currency: currency } })
      if (!actualCurrency) {
        const createCurrencyDto: CreateCurrencyDto = new CreateCurrencyDto(updateCurrencyDto.currency, updateCurrencyDto.amount)
        return await this.create(createCurrencyDto)
      }
      switch (trade) {
        case Trade.Compra:
          return this.updateBuy(currency, updateCurrencyDto, actualCurrency)
        case Trade.Venta:
          return this.updateSell(currency, updateCurrencyDto, actualCurrency)
        case Trade.Retiro:
          return this.updateWithdrawals(currency, updateCurrencyDto, actualCurrency)
        default:
          throw new BadRequestException('Invalid trade type');
      }
    } catch (error) {
      console.log(error instanceof PrismaClientKnownRequestError)
      if (error instanceof PrismaClientKnownRequestError || error instanceof PrismaClientValidationError) {
        throw new InternalServerErrorException('Database error');
      }
      throw error + "HOLA";
    }

  }
  // Update auxiliar methods
  async updateBuy(currency: Currency, updateCurrencyDto: UpdateCurrencyDto, actualCurrency: CurrencyObject) {
    if (updateCurrencyDto.amount == null || updateCurrencyDto.currency == null) return { status: 400, message: `Bad request` }
    if (updateCurrencyDto.currency === "ARS") {
      if (!await this.checkTrade(updateCurrencyDto, actualCurrency)) return { status: 400, message: `Currency is not update. Amount is to big.` }
    }
    updateCurrencyDto.amount = updateCurrencyDto.currency === "ARS" ? actualCurrency!.amount - updateCurrencyDto.amount : actualCurrency!.amount + updateCurrencyDto.amount
    await prisma.currencyRevenue.update({ where: { currency: currency }, data: { amount: updateCurrencyDto.amount } })
    return { status: 200, message: `This action updates a ${currency} currency` }
  }
  async updateSell(currency: Currency, updateCurrencyDto: UpdateCurrencyDto, actualCurrency: CurrencyObject) {
    if (updateCurrencyDto.amount == null || updateCurrencyDto.currency == null) return { status: 400, message: `Bad request` }
    if (updateCurrencyDto.currency != "ARS") {
      if (!await this.checkTrade(updateCurrencyDto, actualCurrency)) return { status: 400, message: `Currency is not update. Amount is to big.` }
    }
    updateCurrencyDto.amount = updateCurrencyDto.currency === "ARS" ? actualCurrency!.amount + updateCurrencyDto.amount : actualCurrency!.amount - updateCurrencyDto.amount
    await prisma.currencyRevenue.update({ where: { currency: currency }, data: { amount: updateCurrencyDto.amount } })
    return { status: 200, message: `This action updates a ${currency} currency` }
  }
  async updateWithdrawals(currency: Currency, updateCurrencyDto: UpdateCurrencyDto, actualCurrency: CurrencyObject) {
    if (updateCurrencyDto.amount == null || updateCurrencyDto.currency == null) return { status: 400, message: `Bad request` }
    if (!await this.checkTrade(updateCurrencyDto, actualCurrency)) return { status: 400, message: `Currency is not update. Amount is to big.` }
    updateCurrencyDto.amount = actualCurrency!.amount - updateCurrencyDto.amount
    await prisma.currencyRevenue.update({ where: { currency: currency }, data: { amount: updateCurrencyDto.amount } })
    return { status: 200, message: `This action updates a ${currency} currency` }
  }

  remove(id: number) {
    return { status: 200, message: `This action removes a #${id} currency` }
  }

  // Auxiliar functions
  // Check if is good request or object
  async checkTrade(updateCurrencyDto: UpdateCurrencyDto, actualCurrency: CurrencyObject): Promise<boolean> {
    if (actualCurrency == null || updateCurrencyDto.amount == null || updateCurrencyDto.amount > actualCurrency?.amount) {
      return false
    }
    return true
  }


}
