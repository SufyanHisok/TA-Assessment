import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CstmButtonComponent } from './cstm-button.component';

describe('CstmButtonComponent', () => {
  let component: CstmButtonComponent;
  let fixture: ComponentFixture<CstmButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CstmButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CstmButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
