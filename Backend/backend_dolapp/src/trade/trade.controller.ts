import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { prisma } from 'prisma/prisma';
import { CreateTradeDto } from './dto/create-trade.dto/create-trade.dto';
@Controller('trade')
export class TradeController {
  @Get()
  async getAllTrades() {
    //await prisma.exchangeRecords.create({data: {date: "Wed Mar 26 2025 00:00:00 GMT-0300 (hora estándar de Argentina)", trade: 'Compra', currency: 'ARS', amount: 1, typePay: 'Efectivo'}})
    return await prisma.exchangeRecords.findMany()
  }

    // @Get(':id')
    // async findById(@Param('id') id: Currency) {
    //   return await prisma.currencyRevenue.findFirst({ where: { currency: id } });
    // }
    @Post()
    async createTrade(@Body() createTradeDto: CreateTradeDto) {
      createTradeDto.amount = createTradeDto.amountForeignCurrency * createTradeDto.exchangeRate
      return await prisma.exchangeRecords.create({data: createTradeDto})
    }
  
    // @Patch(':id')
    //   return this.currencyService.update(+id, updateCurrencyDto);
    // }
  
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.currencyService.remove(+id);
    // }
}
