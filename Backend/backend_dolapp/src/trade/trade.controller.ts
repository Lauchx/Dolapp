import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto/create-trade.dto';
import { TradeService } from './trade.service';
@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) { }
  @Get()
  async getAllTrades() {
    return this.tradeService.findAll()
  }
  
  // @Get(':id')
  // async findById(@Param('id') id: Currency) {
  //   return await prisma.currencyRevenue.findFirst({ where: { currency: id } });
  // }

  @Post()
  async createTrade(@Body() createTradeDto: CreateTradeDto) {
    const result = await this.tradeService.create(createTradeDto)
    console.log(result, "__RESULT__")
    console.log("-----Finish-----")
    return result
  }

  // @Patch(':id')
  //   return this.currencyService.update(+id, updateCurrencyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.currencyService.remove(+id);
  // }
}
