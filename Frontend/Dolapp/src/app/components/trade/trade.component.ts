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
    { Date: "2024-02-21", Trade: "Venta", Currency: "USD", Amount: 64950, TypePay: "Efectivo" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-10-21", Trade: "Venta", Currency: "EUR", Amount: 29600, TypePay: "Efectivo" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Retiros", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Retiros", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2028-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Retiros", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Retiros", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Retiros", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-10-21", Trade: "Venta", Currency: "EUR", Amount: 29600, TypePay: "Efectivo" },
    { Date: "2024-03-21", Trade: "Retiros", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "1900-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "1999-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Retiros", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-10-21", Trade: "Venta", Currency: "EUR", Amount: 29600, TypePay: "Efectivo" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-10-21", Trade: "Venta", Currency: "EUR", Amount: 29600, TypePay: "Efectivo" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2025-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" },
    { Date: "2024-03-21", Trade: "Compra", Currency: "USD", Amount: 33850, TypePay: "Transferencia" }
  ];
  colDefs: ColDef[] = [
    { field: "Date", headerName: "Fecha", editable:true},
    { field: "Trade", headerName: "Operación", editable: true, filter:true },
    { field: "Currency", headerName: "Moneda", editable: true, cellEditor: 'agSelectCellEditor', cellEditorParams: { values: ['USD', 'AR$', 'EUR'] }, filter:true},
    { field: "Amount", headerName: "Monto AR$", editable: true, type: 'numericColumn' },
    { field: "TypePay", headerName: "Tipo de pago", editable: true, cellEditor: 'agSelectCellEditor', cellEditorParams: { values: ['Efectivo', 'Transferencia', 'Cheque'] } }
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
}
