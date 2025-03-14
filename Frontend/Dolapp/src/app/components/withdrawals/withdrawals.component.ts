import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-withdrawals',
  standalone: false,
  templateUrl: './withdrawals.component.html',
  styleUrl: './withdrawals.component.css'
})
export class WithdrawalsComponent {
  constructor(private activeModal: NgbActiveModal) { }
  selectCurrency: string = ""
  date: string = ""
  ngOnInit(){
    this.date = new Date().toLocaleDateString('sv-SE').split('T')[0]
  }
  saveWithdrawals() {
    console.log("save")
  }
  closeModal(bool: boolean) {
    this.activeModal.close(bool)
  }
}
