import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TickerData } from '../../services/websocket.service';

@Component({
  selector: 'app-live-ticker',
  template: `
    <div
      class="ticker-card p-3 shadow-2 border-round mb-2"
      [ngClass]="{ 'price-up': data.change > 0, 'price-down': data.change < 0 }"
    >
      <div class="flex justify-content-between align-items-center">
        <span class="font-bold text-xl">{{ data.symbol }}</span>
        <span class="text-lg">{{
          data.price | currency: 'USD' : 'symbol' : '1.2-2'
        }}</span>
      </div>
      <div class="flex justify-content-end mt-1">
        <span
          [class.text-green-500]="data.change > 0"
          [class.text-red-500]="data.change < 0"
        >
          {{ data.change > 0 ? '+' : '' }}{{ data.change | number: '1.2-2' }}%
        </span>
      </div>
    </div>
  `,
  styles: [
    `
      .ticker-card {
        transition: background-color 0.3s ease;
      }
      .price-up {
        background-color: rgba(76, 175, 80, 0.1);
      }
      .price-down {
        background-color: rgba(244, 67, 54, 0.1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveTickerComponent {
  @Input() data!: TickerData;
}
