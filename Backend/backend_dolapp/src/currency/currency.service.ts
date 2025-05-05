import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency, Trade } from '@prisma/client';
import { prisma } from 'prisma/prisma';
import { Currency as CurrencyObject }  from './entities/currency.entity';

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
   async checkTrade(updateCurrencyDto: UpdateCurrencyDto, actualCurrency: CurrencyObject): Promise<boolean> {
      if (actualCurrency == null || updateCurrencyDto.amount == null || updateCurrencyDto.amount > actualCurrency?.amount) {
        return false
      }
      return true
    }

  async update(id: Currency, updateCurrencyDto: UpdateCurrencyDto, trade: Trade) {
    console.log(updateCurrencyDto, trade)
    if (updateCurrencyDto.amount == null || updateCurrencyDto.currency == null) return {status:400, error:`Bad request`}
    const actualCurrency = await prisma.currencyRevenue.findFirst({ where: { currency: id } })
    if (actualCurrency == null) {
      const createCurrencyDto: CreateCurrencyDto = new CreateCurrencyDto(updateCurrencyDto.currency, updateCurrencyDto.amount)
      await this.create(createCurrencyDto)
      return { status: 200, msj: "Currency create" } // Tendria que returnear lo que diga el metodo create
    }
    if (trade == "Compra") {
      if(updateCurrencyDto.currency === "ARS"){
        if(!await this.checkTrade(updateCurrencyDto, actualCurrency))return {status:400, error:`Currency is not update. Amount is to big.`}
      }
      updateCurrencyDto.amount = updateCurrencyDto.currency === "ARS" ? actualCurrency!.amount - updateCurrencyDto.amount : actualCurrency!.amount + updateCurrencyDto.amount
      await prisma.currencyRevenue.update({ where: { currency: id }, data: { amount: updateCurrencyDto.amount } })
      return { status: 200, msj: `This action updates a ${id} currency` }
    }
    if (trade == "Venta") {
      if(updateCurrencyDto.currency != "ARS"){
        if(!await this.checkTrade(updateCurrencyDto, actualCurrency))return {status:400, error:`Currency is not update. Amount is to big.`}
      }
      updateCurrencyDto.amount = updateCurrencyDto.currency === "ARS" ? actualCurrency!.amount + updateCurrencyDto.amount : actualCurrency!.amount - updateCurrencyDto.amount
      await prisma.currencyRevenue.update({ where: { currency: id }, data: { amount: updateCurrencyDto.amount } })
      return { status: 200, msj: `This action updates a ${id} currency` }
    }
    if (trade == "Retiro") {
      if(!await this.checkTrade(updateCurrencyDto, actualCurrency))return {status:400, error:`Currency is not update. Amount is to big.`}
      updateCurrencyDto.amount = actualCurrency!.amount - updateCurrencyDto.amount
      await prisma.currencyRevenue.update({ where: { currency: id }, data: { amount: updateCurrencyDto.amount } })
      return { status: 200, msj: `This action updates a ${id} currency` }
    }
  }

  remove(id: number) {
    return { status: 200, msj: `This action removes a #${id} currency` }
  }
}
