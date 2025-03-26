import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Trade } from '../../modules/Trade';
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
    this.date = new Date().toLocaleDateString('sv-SE').split('T')[0]
  }

  saveTrade() {
    let tradeDate = new Date((document.getElementById("date") as HTMLInputElement).value)
    console.log(tradeDate)
    tradeDate.setHours(12, 0, 0, 0);
    // Se desfasa el dia con la hora porque tiene otro formarto de hora.
    console.log(tradeDate)
    let tradeName = (document.getElementById("trade") as HTMLInputElement).value
    let tradeCurrency = (document.getElementById("currency") as HTMLInputElement).value
    let tradeAmount = parseFloat((document.getElementById("amount") as HTMLInputElement).value)
    let tradeTypePay = (document.getElementById("typePay") as HTMLInputElement).value
    const trade = new Trade(tradeDate, tradeName, tradeCurrency, tradeAmount, tradeTypePay);
    console.log(trade)
  }
  closeModal(bool: boolean) {
    this.activeModal.close(bool)
  }


}
