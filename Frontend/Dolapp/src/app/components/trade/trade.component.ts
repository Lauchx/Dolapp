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

  myTheme = themeQuartz.withParams({
    backgroundColor: 'rgb(17, 61, 61)',
    foregroundColor: 'rgb(182, 243, 238)',
    headerTextColor: 'rgb(132, 241, 232)',
    headerBackgroundColor: 'rgb(8, 97, 97)',
    oddRowBackgroundColor: 'rgb(0, 0, 0, 0.03)',
    headerColumnResizeHandleColor: 'rgb(0, 0, 0)',
  });
  theme: Theme | "legacy" = this.myTheme;
  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "make", filter: true },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ];
}
