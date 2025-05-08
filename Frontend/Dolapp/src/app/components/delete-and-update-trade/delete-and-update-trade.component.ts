import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-delete-and-update-trade',
  standalone: false,
  templateUrl: './delete-and-update-trade.component.html',
  styleUrl: './delete-and-update-trade.component.css'
})
export class DeleteAndUpdateTradeComponent implements ICellRendererAngularComp {
  agInit(params: ICellRendererParams<any, any, any>): void { }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }
  buttonClicked() {
    alert('Software Launched');
  }

}
