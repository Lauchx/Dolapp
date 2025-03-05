import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTradeComponent } from './input-trade.component';

describe('InputTradeComponent', () => {
  let component: InputTradeComponent;
  let fixture: ComponentFixture<InputTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
