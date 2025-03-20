export interface CurrencyConversionResponse {
    from: string;
    to: string;
    amount: number;
    convertedAmount: number;
    rate: number;
    timestamp: string;
  }