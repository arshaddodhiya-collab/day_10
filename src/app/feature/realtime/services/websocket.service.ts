import { Injectable } from '@angular/core';
import {
  Observable,
  retry,
  catchError,
  EMPTY,
  scan,
  map,
  shareReplay,
} from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

export interface TickerData {
  symbol: string;
  price: number;
  change: number;
}

interface BinanceStreamMessage {
  stream: string;
  data: BinanceMiniTicker;
}

interface BinanceMiniTicker {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  c: string; // Close price
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  v: string; // Total traded base asset volume
  q: string; // Total traded quote asset volume
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public ticker$: Observable<TickerData[]>;

  private readonly BINANCE_URL =
    'wss://stream.binance.com:9443/stream?streams=btcusdt@miniTicker/ethusdt@miniTicker/solusdt@miniTicker/bnbusdt@miniTicker/adausdt@miniTicker';

  constructor() {
    this.ticker$ = webSocket<BinanceStreamMessage>(this.BINANCE_URL).pipe(
      retry({ delay: 120000 }),
      catchError((err) => {
        console.error('WebSocket Error:', err);
        return EMPTY;
      }),
      // Accumulate updates into a map to maintain state for all symbols
      scan((acc: Map<string, TickerData>, msg: BinanceStreamMessage) => {
        const ticker = msg.data;
        const currentPrice = parseFloat(ticker.c);
        const openPrice = parseFloat(ticker.o);
        const changePercent = ((currentPrice - openPrice) / openPrice) * 100;

        acc.set(ticker.s, {
          symbol: ticker.s,
          price: currentPrice,
          change: changePercent,
        });
        return acc;
      }, new Map<string, TickerData>()),
      // Convert Map to Array for the UI
      map((acc) => Array.from(acc.values())),
      shareReplay(1),
    );
  }
}
