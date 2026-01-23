import { Injectable } from '@angular/core';
import { Observable, interval, map, shareReplay } from 'rxjs';

export interface TickerData {
  symbol: string;
  price: number;
  change: number;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private symbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA'];

  public ticker$: Observable<TickerData[]>;

  constructor() {
    this.ticker$ = interval(1000).pipe(
      map(() => this.generateMockData()),
      shareReplay(1),
    );
  }

  private generateMockData(): TickerData[] {
    return this.symbols.map((symbol) => ({
      symbol,
      price: Math.random() * 1000,
      change: Math.random() * 10 - 5,
    }));
  }
}
