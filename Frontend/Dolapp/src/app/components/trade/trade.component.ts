import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import type { ColDef } from 'ag-grid-community';
import { InputTradeComponent } from '../input-trade/input-trade.component';
import {
  AllCommunityModule,
  ModuleRegistry,
  colorSchemeDarkWarm,
  themeQuartz,
  Theme
} from 'ag-grid-community';
import { WithdrawalsComponent } from '../withdrawals/withdrawals.component';

ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-trade',
  standalone: false,
  templateUrl: './trade.component.html',
  styleUrl: './trade.component.css'
})
export class TradeComponent {
  constructor(private ngModal: NgbModal) { }
  // add table theme 
  dollars: number = 0;
  addProduct(): void {
    const ngModal = this.ngModal.open(InputTradeComponent, { backdrop: 'static' });
    ngModal.result.then(resultado => {
      if (resultado) {
        console.log("this")
      } else {

      }
    })
  }
  myTheme: Theme = themeQuartz.withPart(colorSchemeDarkWarm).withParams({
    backgroundColor: 'rgb(17, 61, 61)',
    foregroundColor: 'rgb(182, 243, 238)',
    headerTextColor: 'rgb(132, 241, 232)',
    headerBackgroundColor: 'rgb(8, 97, 97)',
    oddRowBackgroundColor: 'rgb(0, 0, 0, 0.03)',
    headerColumnResizeHandleColor: 'rgb(0, 0, 0)',
  });
  rowData = [
    { date: "2024-02-21", trade: "Venta", exchangeRate:"1200", currency: "USD", amount: 64950, amountForeignCurrency:2, typePay: "Efectivo" },
    { date: "2024-02-21", trade: "Venta", exchangeRate:"1200", currency: "EUR", amount: 64950, amountForeignCurrency:2, typePay: "Efectivo" },
  ];
  colDefs: ColDef[] = [
    { field: "date", headerName: "Fecha", editable:true},
    { field: "trade", headerName: "Operación", editable: true, filter:true },
    { field: "exchangeRate", headerName: "Tipo de cambio", editable: true, type: 'numericColumn' },
    { field: "amountForeignCurrency", headerName: "Monto moneda extranjera", editable: true, type: 'numericColumn' },
    { field: "amount", headerName: "Monto AR$", editable: true, type: 'numericColumn' },
    { field: "currency", headerName: "Moneda", editable: true, cellEditor: 'agSelectCellEditor', cellEditorParams: { values: ['USD', 'AR$', 'EUR'] }, filter:true},
    { field: "typePay", headerName: "Tipo de pago", editable: true, cellEditor: 'agSelectCellEditor', cellEditorParams: { values: ['Efectivo', 'Transferencia', 'Cheque'] } }
  ];

  addTrade() {
    const ngModal = this.ngModal.open(InputTradeComponent, { backdrop: 'static' })
    ngModal.result.then(resultado => {
      if (resultado) {
        console.log("this")
      } else {
      }
    })
  }
  onCellValueChanged(event: any) {
    console.log('Dato ingresado:', event.data);
  }
  addWithdrawals() {
    const ngModal = this.ngModal.open(WithdrawalsComponent, { backdrop: 'static' })
    ngModal.result.then(resultado => {
      if (resultado) {
        console.log("this")
      } else {

      }
    })
  }
  onGridSizeChanged(params: any) {
    params.api.sizeColumnsToFit();
  }
}
