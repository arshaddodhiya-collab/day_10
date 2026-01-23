import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TickerData } from '../../services/websocket.service';

@Component({
  selector: 'app-optimized-list',
  template: `
    <div class="grid">
      <div class="col-12" *ngFor="let item of items; trackBy: trackBySymbol">
        <app-live-ticker [data]="item"></app-live-ticker>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptimizedListComponent {
  @Input() items: TickerData[] = [];

  trackBySymbol(index: number, item: TickerData): string {
    return item.symbol;
  }
}
