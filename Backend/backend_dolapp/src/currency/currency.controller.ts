import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { prisma } from 'prisma/prisma';
import { Currency } from '@prisma/client';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    console.log(createCurrencyDto)
    return this.currencyService.create(createCurrencyDto);
  }

  @Get()
  async findAll() {
    //await prisma.currencyRevenue.create({data:{currency:"BRL", amount:666, revenue:90}})
    return await prisma.currencyRevenue.findMany();
    //return this.currencyService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: Currency) {
    return await prisma.currencyRevenue.findFirst({ where: { currency: id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurrencyDto: UpdateCurrencyDto) {
    return this.currencyService.update(+id, updateCurrencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyService.remove(+id);
  }
}
