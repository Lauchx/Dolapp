import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//
import { HeaderComponent } from './components/header/header.component';
import { TradeComponent } from './components/trade/trade.component';
//
import { AgGridAngular } from 'ag-grid-angular'; 
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TradeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridAngular,
    AgGridModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
