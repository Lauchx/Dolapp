import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from '@prisma/client';
import { prisma } from 'prisma/prisma';

@Injectable()
export class CurrencyService {
  async create(createCurrencyDto: CreateCurrencyDto) {
    return await prisma.currencyRevenue.create({data:createCurrencyDto})
  }

  findAll() {
    return `This action returns all currency`;
  }

  findOne(id: number) {
    return `This action returns a #${id} currency`;
  }

  async update(id: Currency, updateCurrencyDto: UpdateCurrencyDto) {
    if (updateCurrencyDto.amount == null || updateCurrencyDto.currency == null ) return `Bad request`
    const actualCurrency = await prisma.currencyRevenue.findFirst({ where: { currency: id } })
    if (actualCurrency == null) {
      const createCurrencyDto: CreateCurrencyDto = new CreateCurrencyDto(updateCurrencyDto.currency, updateCurrencyDto.amount)
       await this.create(createCurrencyDto) 
       return {status: 200, msj:"Currency create"}
    }
    updateCurrencyDto.amount = actualCurrency!.amount - updateCurrencyDto.amount
    await prisma.currencyRevenue.update({ where: { currency: id }, data: { amount: updateCurrencyDto.amount } })
    return {status: 200, msj:"`This action updates a ${id} currency`"}
  }

  remove(id: number) {
    return {status: 200, msj:"`This action removes a #${id} currency`"}
  }
}
