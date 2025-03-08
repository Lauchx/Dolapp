//angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// componentes
import { HeaderComponent } from './components/header/header.component';
import { TradeComponent } from './components/trade/trade.component';
import { InputTradeComponent } from './components/input-trade/input-trade.component';
// ag-grid
import { AgGridAngular } from 'ag-grid-angular'; 
import { AgGridModule } from 'ag-grid-angular';
// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WithdrawalsComponent } from './components/withdrawals/withdrawals.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TradeComponent,
    InputTradeComponent,
    WithdrawalsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridAngular,
    AgGridModule,
    NgbModule,
    FormsModule,         // 👈 Asegúrate de que esto está aquí
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
