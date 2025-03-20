import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CstmCurrencyDropdownComponent } from './cstm-currency-dropdown.component';

describe('CstmCurrencyDropdownComponent', () => {
  let component: CstmCurrencyDropdownComponent;
  let fixture: ComponentFixture<CstmCurrencyDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CstmCurrencyDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CstmCurrencyDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
