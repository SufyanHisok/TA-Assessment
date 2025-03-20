import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { CurrencyConversionResponse } from '../models/currency-converter.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {

  private readonly baseUrl = environment.apiUrl;
  private readonly controller = 'currency-converter';

  constructor(private http:HttpClient) { }

  convertCurrency(from: string, to: string, amount: number): Observable<CurrencyConversionResponse> {
    return this.http.get<CurrencyConversionResponse>(`${this.baseUrl}${this.controller}/convert-currency`, {
      params: { from, to, amount: amount.toString() }
    })
    }


  getCurrency(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.controller}/currencies`)
  }
}
