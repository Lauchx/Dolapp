import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAndUpdateTradeComponent } from './delete-and-update-trade.component';

describe('DeleteAndUpdateTradeComponent', () => {
  let component: DeleteAndUpdateTradeComponent;
  let fixture: ComponentFixture<DeleteAndUpdateTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteAndUpdateTradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAndUpdateTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
