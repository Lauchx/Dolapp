import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency, Trade } from '@prisma/client';
import { prisma } from 'prisma/prisma';

@Injectable()
export class CurrencyService {
  async create(createCurrencyDto: CreateCurrencyDto) {
    return await prisma.currencyRevenue.create({ data: createCurrencyDto })
  }

  findAll() {
    return `This action returns all currency`;
  }

  findOne(id: number) {
    return `This action returns a #${id} currency`;
  }

  async update(id: Currency, updateCurrencyDto: UpdateCurrencyDto, trade: Trade) {
    console.log(updateCurrencyDto, trade)
    if (updateCurrencyDto.amount == null || updateCurrencyDto.currency == null) return `Bad request`
    const actualCurrency = await prisma.currencyRevenue.findFirst({ where: { currency: id } })
    console.log(actualCurrency)
    if (actualCurrency == null) {
      const createCurrencyDto: CreateCurrencyDto = new CreateCurrencyDto(updateCurrencyDto.currency, updateCurrencyDto.amount)
      await this.create(createCurrencyDto)
      return { status: 200, msj: "Currency create" } // Tendria que returnear lo que diga el metodo create
    }
    // if (updateCurrencyDto.currency == "ARS") {
    //   if (trade == "Compra") {
    //     updateCurrencyDto.amount = actualCurrency!.amount - updateCurrencyDto.amount
    //     await prisma.currencyRevenue.update({ where: { currency: id }, data: { amount: updateCurrencyDto.amount } })
    //     console.log("compra ars")
    //     return { status: 200, msj: "`This action updates a ${id} currency`" }
    //   }
    //   if (trade == "Venta") {
    //     updateCurrencyDto.amount += actualCurrency!.amount
    //     await prisma.currencyRevenue.update({ where: { currency: id }, data: { amount: updateCurrencyDto.amount } })
    //     console.log("venta ars")
    //     return { status: 200, msj: `This action updates a ${id} currency` }
    //   }
    //   if (trade == "Retiro") {

    //   }
    // }
    if (trade == "Compra") {
      updateCurrencyDto.amount = updateCurrencyDto.currency === "ARS" ? actualCurrency!.amount - updateCurrencyDto.amount : actualCurrency!.amount + updateCurrencyDto.amount
      await prisma.currencyRevenue.update({ where: { currency: id }, data: { amount: updateCurrencyDto.amount } })
      return { status: 200, msj: `This action updates a ${id} currency` }
    }
    if (trade == "Venta") {
      updateCurrencyDto.amount = updateCurrencyDto.currency === "ARS" ? actualCurrency!.amount + updateCurrencyDto.amount : actualCurrency!.amount - updateCurrencyDto.amount
      await prisma.currencyRevenue.update({ where: { currency: id }, data: { amount: updateCurrencyDto.amount } })
      return { status: 200, msj: `This action updates a ${id} currency` }
    }
    if (trade == "Retiro") {

    }
  }

  remove(id: number) {
    return { status: 200, msj: `This action removes a #${id} currency` }
  }
}
