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
    return this.currencyService.create(createCurrencyDto);
  }

  @Get()
  async findAll() {
    return await prisma.currencyRevenue.findMany();
    //return this.currencyService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: Currency) {
    return await prisma.currencyRevenue.findFirst({ where: { currency: id } });
  }

  @Patch(':id')
  update(@Param('id') id: Currency, @Body() updateCurrencyDto: UpdateCurrencyDto) {
    return this.currencyService.update(id, updateCurrencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyService.remove(+id);
  }
}
