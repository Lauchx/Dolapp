import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Trade } from '../../modules/Trade';
import { CrudService } from '../../services/crud.service';
import { Currency } from '../../modules/Currency';
@Component({
  selector: 'app-input-trade',
  standalone: false,
  templateUrl: './input-trade.component.html',
  styleUrl: './input-trade.component.css'
})
export class InputTradeComponent {
  constructor(private activeModal: NgbActiveModal, private service: CrudService) { }
  date: string = ""
  ngOnInit() {
    this.date = new Date().toLocaleDateString('sv-SE').split('T')[0]
  }
  getLocalDateFromInput(): Date {
    const inputElement = document.getElementById("date") as HTMLInputElement;
    const [year, month, day] = inputElement.value.split('-').map(Number);

    return new Date(year, month - 1, day);
  }

  saveTrade() {
    // Completando los datos para guardar el trade en el db
    let tradeDate = (document.getElementById("date") as HTMLInputElement).value
    let tradeName = (document.getElementById("trade") as HTMLInputElement).value
    let tradeCurrency = (document.getElementById("currency-option") as HTMLInputElement).value
    let tradeAmountForeignCurrency = parseFloat((document.getElementById("amountForeignCurrency") as HTMLInputElement).value)
    let tradeTypePay = (document.getElementById("typePay") as HTMLInputElement).value
    let exchangeRate = parseFloat((document.getElementById("exchangeRate") as HTMLInputElement).value)
    const trade = new Trade(tradeDate, tradeName, tradeCurrency, tradeAmountForeignCurrency, tradeTypePay, exchangeRate);
    // Creando el trade y guardando en la db
    this.service.postTrade("/trade", trade).subscribe(res => {
      console.log(res)
      // Modificando el monto en moneda extranjera
      let foreignCurrency: Currency;
      if(tradeName == "Compra") {foreignCurrency = new Currency(tradeCurrency, -1 * tradeAmountForeignCurrency)}
      
      this.service.patchCurrecy("/currency/" + tradeCurrency, foreignCurrency).subscribe(res => {
        console.log(res)
        // Modificando el monto en moneda nacional
        const nationalCurrency: Currency = new Currency(tradeCurrency, tradeAmountForeignCurrency * exchangeRate)
        this.service.patchCurrecy("/currency/ARS", nationalCurrency).subscribe(res => {
          console.log(res)
          this.closeModal(true)
        })
      })


    })
  }
  closeModal(bool: boolean) {
    this.activeModal.close(bool)
  }


}
