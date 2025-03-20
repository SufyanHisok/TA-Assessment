import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'app-cstm-currency-dropdown',
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cstm-currency-dropdown.component.html',
  styleUrl: './cstm-currency-dropdown.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CstmCurrencyDropdownComponent),
      multi: true
    }
  ]
})
export class CstmCurrencyDropdownComponent implements OnInit {
@Input() currencies: any[] = [];
  @Input() placeholder: string = 'Select Currency';
  @Input() ngModel!: string; 
  @Output() selectedCurrency = new EventEmitter<string>(); 

  searchControl = new FormControl<string | null>(null);
  filteredCurrencies$!: Observable<any[]> // Filtered currencies 
  @ViewChild('auto') autoComplete!: MatAutocomplete;

  value: string = '';
  onChange = (value: any) => {};
  onTouched = () => {};

  ngOnInit() {
    this.filteredCurrencies$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : '')),
      map(searchTerm => this._filterCurrencies(searchTerm))
    );
  }

  private _filterCurrencies(searchTerm: string): any[] {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return this.currencies.filter(currency =>
      currency.code?.toLowerCase().includes(lowerSearchTerm) ||
      currency.name?.toLowerCase().includes(lowerSearchTerm)
    );
  }

  onSelectionChange(selectedCode: string) {
    this.ngModel = selectedCode; 
    this.searchControl.setValue(selectedCode);
    this.selectedCurrency.emit(selectedCode); 
  }

  openDropdown() {
    if (this.autoComplete && this.currencies.length > 0) {
      this.searchControl.setValue('');
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
