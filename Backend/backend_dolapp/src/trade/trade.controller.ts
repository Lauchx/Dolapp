import { Controller, Get, Put } from '@nestjs/common';
import { Currency, TypePay } from '@prisma/client';
import { prisma } from 'prisma/prisma';
@Controller('trade')
export class TradeController {
    @Get()
    async getAllTrades(){
       await prisma.exchangeRecords.create({data: {date: new Date(), trade: "h", amount: 2, currency: Currency.EUR, typePay:"Efectivo" }})
        return await prisma.exchangeRecords.findMany()
    }
    @Put()
    createTrade(){
        
    }
}
