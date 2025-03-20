import { Component, OnInit } from '@angular/core';
import { CstmCurrencyDropdownComponent } from "../../shared/cstm-currency-dropdown/cstm-currency-dropdown.component";
import { CurrencyConverterService } from '../../services/currency-converter.service';
import { MaterialModule } from '../../material/material.module';
import { CurrencyConversionResponse } from '../../models/currency-converter.model';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from "../../shared/loader/loader.component";
import { ConverstionHistoryComponent } from "./converstion-history/converstion-history.component";

@Component({
  selector: 'app-currency-converter',
  imports: [CstmCurrencyDropdownComponent, MaterialModule, FormsModule, LoaderComponent, ConverstionHistoryComponent],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css'
})
export class CurrencyConverterComponent implements OnInit {

  selectedFromCurrency:any;
  selectedToCurrency:any;
  currency:any[]=[];
  amount!:number | null;
  exchangedData!: CurrencyConversionResponse;
  loader!:boolean

  conversionHistory: any[] = [];
  constructor(private currencyConverter:CurrencyConverterService){

  }
  ngOnInit(): void {
    this.getConversionHistory()
    this.getCurrency();
  }

  
  getCurrency(){
    this.currencyConverter.getCurrency().subscribe((res:any)=>{
      this.currency= Object.values(res.data).map((data:any)=> (
        {
          code: data.code,
          symbol: data.symbol,
          name: data.name
        }
      ));
      console.log(this.currency);
    })
  }

  private getConversionHistory() {
    this.conversionHistory = JSON.parse(localStorage.getItem('conversionHistory') || '[]')
    .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  convert() {
    if (!this.selectedFromCurrency || !this.selectedToCurrency || (this.amount ?? 0) <= 0  ) {
      alert('Please select valid currencies and enter an amount.');
      return;
    }

    this.loader = true;

    this.currencyConverter.convertCurrency(this.selectedFromCurrency, this.selectedToCurrency, this.amount ?? 0).subscribe
    ({
      next: (res: CurrencyConversionResponse) => {
        setTimeout(() => {
          this.exchangedData = res;
          console.log(this.exchangedData);
          this.loader = false;

          const existingHistory = JSON.parse(localStorage.getItem('conversionHistory') || '[]');

          ///to generate id (e.g. 1,2,3 for every record saved)
          const newId = existingHistory.length > 0 ? existingHistory[existingHistory.length - 1].id + 1 : 1;

          const conversionEntry = {
            id: newId,
            from: res.from,
            to: res.to,
            amount: res.amount,
            convertedAmount: res.convertedAmount,
            rate: res.rate,
            timestamp: new Date().toLocaleString()
          };

          this.saveConversionToLocalStorage(conversionEntry);
        }, 2000);
      },
      error: (error: any) => {
        console.error(error);
        alert('error from server');
        this.loader = false;
      }
    })
  }

  private saveConversionToLocalStorage(conversion: any) {
    const existingHistory = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    existingHistory.push(conversion);
    localStorage.setItem('conversionHistory', JSON.stringify(existingHistory));
    this.getConversionHistory();
  }

  deleteConversion(id: number) {
    let existingHistory = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    existingHistory = existingHistory.filter((item: any) => item.id !== id);
  
    localStorage.setItem('conversionHistory', JSON.stringify(existingHistory));
  
    this.getConversionHistory(); 
  }


  onCurrencySelected(type: 'from' | 'to', selectedCode: string) {
    if (type === 'from') {
      this.selectedFromCurrency = selectedCode;
    } else {
      this.selectedToCurrency = selectedCode;
    }
  }

}
