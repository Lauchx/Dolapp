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
import { Currency, Trade } from '@prisma/client';

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
  update(@Param('id') currency: Currency, @Body() body: {currency: Currency; amount:number; trade: Trade}) {
    console.log(body.currency, body.amount)
    let updateCurrencyDto = new UpdateCurrencyDto()
    updateCurrencyDto.amount = body.amount
    updateCurrencyDto.currency = body.currency
    console.log(updateCurrencyDto)
    return this.currencyService.update(currency, updateCurrencyDto, body.trade);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyService.remove(+id);
  }
}
