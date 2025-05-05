import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudService } from '../../services/crud.service';
import { Trade } from '../../modules/Trade';
import { Currency } from '../../modules/Currency';

@Component({
  selector: 'app-withdrawals',
  standalone: false,
  templateUrl: './withdrawals.component.html',
  styleUrl: './withdrawals.component.css'
})
export class WithdrawalsComponent {
  constructor(private activeModal: NgbActiveModal, private service: CrudService) { }
  selectCurrency: string = ""
  date: string = ""
  ngOnInit() {
    this.date = new Date().toLocaleDateString('sv-SE').split('T')[0]
  }
  saveWithdrawals() {
    let tradeDate = (document.getElementById('tradeDate') as HTMLInputElement).value
    let currencyName = (document.getElementById('currencyName') as HTMLInputElement).value
    console.log(currencyName)
    let withdrawalsAmount = parseFloat((document.getElementById('withdrawalsAmount') as HTMLInputElement).value)
    let exchangeRate = 1;
    if (currencyName != "ARS") {
     exchangeRate = parseFloat((document.getElementById('exchangeRate') as HTMLInputElement).value) 
    }
    let typePay = (document.getElementById('typePay') as HTMLInputElement).value
    const withdrawals = new Trade(tradeDate, "Retiro", currencyName, withdrawalsAmount, typePay, exchangeRate)
    //date: string, trade: string, currency: string, amountForeignCurrency: number, typePay: string, exchangeRate:number
    this.service.postTrade("/trade", withdrawals).subscribe(res => {
      console.log(res)
      let withdrawalsCurrency = new Currency(currencyName, withdrawalsAmount * exchangeRate);
      this.service.patchCurrecy("/currency/"+currencyName,withdrawalsCurrency,"Retiro").subscribe(res=>{
        console.log(res)
      })
      this.closeModal(true)
    })
  }
  closeModal(bool: boolean) {
    this.activeModal.close(bool)
  }
}
