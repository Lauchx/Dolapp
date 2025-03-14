import { Controller, Get, Put } from '@nestjs/common';
import { Currency, TypePay } from '@prisma/client';
import { prisma } from 'prisma/prisma';
@Controller('trade')
export class TradeController {
    @Get()
    async getAllTrades(){
      // await prisma.exchangeRecords.create({data: {date: new Date(), trade: "Venta", amount: 210000, currency: Currency.EUR, typePay:"Transferencia" }})
        return await prisma.exchangeRecords.findMany()
    }
    @Put()
    createTrade(){
        
    }
}
