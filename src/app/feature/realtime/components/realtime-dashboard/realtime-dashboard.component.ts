import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketService, TickerData } from '../../services/websocket.service';

@Component({
  selector: 'app-realtime-dashboard',
  template: `
    <div class="p-4">
      <h2 class="text-3xl font-bold mb-4">Realtime Market Data (Simulated)</h2>
      <p class="mb-4">
        Demonstrating OnPush Change Detection, Lazy Loading, and RxJS Streams.
      </p>

      <div class="card" *ngIf="tickerData$ | async as data">
        <div class="grid">
          <div class="col-12 md:col-8">
            <app-realtime-chart
              [data]="data"
              [symbol]="selectedSymbol"
            ></app-realtime-chart>
          </div>
          <div class="col-12 md:col-4">
            <h3 class="mb-2">Live Prices (Click to View)</h3>
            <app-optimized-list
              [items]="data"
              (symbolSelected)="onSymbolSelect($any($event))"
            ></app-optimized-list>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RealtimeDashboardComponent {
  tickerData$: Observable<TickerData[]>;
  selectedSymbol: string = 'BTCUSDT';

  constructor(private websocketService: WebsocketService) {
    this.tickerData$ = this.websocketService.ticker$;
  }

  onSymbolSelect(symbol: string) {
    this.selectedSymbol = symbol;
  }
}
