import { Component } from '@angular/core';

import type { ColDef } from 'ag-grid-community';
import {
  AllCommunityModule, ModuleRegistry, themeAlpine,
  themeBalham,
  themeMaterial,
  themeQuartz,
  Theme
} from 'ag-grid-community';
import { colorSchemeDark } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-trade',
  standalone: false,
  templateUrl: './trade.component.html',
  styleUrl: './trade.component.css'
})
export class TradeComponent {

  // add table theme 
  myTheme: Theme= themeQuartz.withParams({
    backgroundColor: 'rgb(17, 61, 61)',
    foregroundColor: 'rgb(182, 243, 238)',
    headerTextColor: 'rgb(132, 241, 232)',
    headerBackgroundColor: 'rgb(8, 97, 97)',
    oddRowBackgroundColor: 'rgb(0, 0, 0, 0.03)',
    headerColumnResizeHandleColor: 'rgb(0, 0, 0)',
  });
  rowData = [
    { Date: "Tesla", trade: "Model Y", currency: "3", Amount: 64950, TypePay: "reue" },
    { Date: "Ford", trade: "F-Series",currency: true, Amount: 33850, TypePay: "2" },
    { Date: "Toyota", trade: "Corolla",currency: 3, Amount: 29600, TypePay: false },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "Date", headerName:"Fecha", filter: true},
    { field: "trade", headerName: "Operación", editable: true, },
    { field: "currency", headerName:"Moneda"},
    { field: "Amount", headerName: "Monto AR$" },
    { field: "TypePay", headerName: "Tipo de pago" }
  ];
}
