import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverstionHistoryComponent } from './converstion-history.component';

describe('ConverstionHistoryComponent', () => {
  let component: ConverstionHistoryComponent;
  let fixture: ComponentFixture<ConverstionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConverstionHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConverstionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
