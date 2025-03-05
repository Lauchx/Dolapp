import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-input-trade',
  standalone: false,
  templateUrl: './input-trade.component.html',
  styleUrl: './input-trade.component.css'
})
export class InputTradeComponent {
  constructor(private activeModal: NgbActiveModal) { }
  date: string = ""
  ngOnInit() {
    this.date = new Date().toISOString().split('T')[0]
  }

  saveTrade() {
    console.log("agregado")
  }
  closeModal(bool: boolean) {
    this.activeModal.close(bool)
  }


}
