import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradeModule } from './trade/trade.module';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [TradeModule, CurrencyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
