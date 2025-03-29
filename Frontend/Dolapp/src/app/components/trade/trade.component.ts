import { Component, Input } from '@angular/core';
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
import { CrudService } from '../../services/crud.service';  
import { Currency } from '../../modules/Currency';
import { elementAt } from 'rxjs';
import { Trade } from '../../modules/Trade';
ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-trade',
  standalone: false,
  templateUrl: './trade.component.html',
  styleUrl: './trade.component.css'
})
export class TradeComponent {
  currencyName: string = 'ARS'
  constructor(private ngModal: NgbModal, private service: CrudService) { }
  // add table theme 
  rowData = []
  currencyAmount = 0
  revenueAmount = 0
  revenueTotal = 0

  ngOnInit(){
    this.service.get("/trade").subscribe(res => {
      res.forEach((elem: Trade) =>{
        elem.date = elem.date.split('T')[0]
      })
      this.rowData = res
    })
    this.service.get("/currency").subscribe(res =>{
      res.forEach((element: Currency)=> {
        this.revenueTotal += element.revenue
      })
      this.changeCurrency()
    })
  }

  changeCurrency(){
    this.service.getById("/currency", this.currencyName).subscribe(res => {
      this.currencyAmount = res.amount
      this.revenueAmount = res.revenue
    })
  }
  
  dollars: number = 0;
  addProduct(): void {
    const ngModal = this.ngModal.open(InputTradeComponent, { backdrop: 'static' });
    ngModal.result.then(resultado => {
      if (resultado) {
        this.ngOnInit()
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

  colDefs: ColDef[] = [
    { field: "date", headerName: "Fecha", editable: true },
    { field: "trade", headerName: "Operación", editable: true, filter: true },
    { field: "exchangeRate", headerName: "Tipo de cambio", editable: true, type: 'numericColumn' },
    { field: "amountForeignCurrency", headerName: "Monto moneda extranjera", editable: true, type: 'numericColumn' },
    { field: "amount", headerName: "Monto AR$", editable: true, type: 'numericColumn' },
    { field: "currency", headerName: "Moneda", editable: true, cellEditor: 'agSelectCellEditor', cellEditorParams: { values: ['USD', 'AR$', 'EUR'] }, filter: true },
    { field: "typePay", headerName: "Tipo de pago", editable: true, cellEditor: 'agSelectCellEditor', cellEditorParams: { values: ['Efectivo', 'Transferencia'] } }
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
