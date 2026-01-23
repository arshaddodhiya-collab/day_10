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
        <app-optimized-list [items]="data"></app-optimized-list>
      </div>
    </div>
  `,
})
export class RealtimeDashboardComponent {
  tickerData$: Observable<TickerData[]>;

  constructor(private websocketService: WebsocketService) {
    this.tickerData$ = this.websocketService.ticker$;
  }
}
