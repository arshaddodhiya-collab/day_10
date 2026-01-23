import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ChartConfiguration, ChartOptions, ScriptableContext } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TickerData } from '../../services/websocket.service';

@Component({
  selector: 'app-realtime-chart',
  template: `
    <div class="card p-3 shadow-2 border-round surface-card h-full">
      <div class="flex justify-content-between mb-3 align-items-center">
        <div class="flex flex-column">
          <span class="text-2xl font-bold">{{
            symbol || 'Select Symbol'
          }}</span>
          <span class="text-sm text-500">Real-time 1s Interval</span>
        </div>
        <span
          *ngIf="currentPrice"
          [class.text-green-500]="isUp"
          [class.text-red-500]="!isUp"
          class="text-xl font-medium"
        >
          {{ currentPrice | currency: 'USD' }}
        </span>
      </div>
      <div class="relative" style="height: 300px; width: 100%">
        <canvas
          baseChart
          [data]="lineChartData"
          [options]="lineChartOptions"
          [type]="'line'"
        >
        </canvas>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RealtimeChartComponent implements OnChanges {
  @Input() data: TickerData[] = [];
  @Input() symbol: string = 'BTCUSDT';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // History for ALL symbols
  private historyMap = new Map<string, { labels: string[]; data: number[] }>();
  private readonly MAX_POINTS = 50;

  public currentPrice: number = 0;
  public isUp: boolean = true;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Price',
        fill: true,
        tension: 0.4,
        borderColor: '#22C55E',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    interaction: {
      mode: 'nearest',
      intersect: false,
      axis: 'x',
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => `Price: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
      },
      y: {
        display: true,
        position: 'right',
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
      },
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data.length > 0) {
      this.updateHistory();
    }

    if (changes['symbol']) {
      this.updateChartForSymbol();
    }
  }

  private updateHistory(): void {
    const now = new Date().toLocaleTimeString();

    this.data.forEach((item) => {
      if (!this.historyMap.has(item.symbol)) {
        this.historyMap.set(item.symbol, { labels: [], data: [] });
      }

      const history = this.historyMap.get(item.symbol)!;
      history.labels.push(now);
      history.data.push(item.price);

      if (history.labels.length > this.MAX_POINTS) {
        history.labels.shift();
        history.data.shift();
      }
    });

    // Update current chart if the symbol matches
    this.updateChartForSymbol();
  }

  private updateChartForSymbol(): void {
    const history = this.historyMap.get(this.symbol);
    if (!history) return;

    // Update Chart Data
    this.lineChartData.labels = history.labels;
    this.lineChartData.datasets[0].data = history.data;

    // Update styling based on trend (Green vs Red)
    const current = history.data[history.data.length - 1];
    const prev = history.data[history.data.length - 2] || current;
    this.isUp = current >= prev;
    const color = this.isUp ? '#22C55E' : '#EF4444'; // Green or Red
    const bg = this.isUp ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)';

    this.currentPrice = current;
    this.lineChartData.datasets[0].borderColor = color;
    this.lineChartData.datasets[0].backgroundColor = (
      context: ScriptableContext<'line'>,
    ) => {
      const ctx = context.chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(
        0,
        this.isUp ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)',
      );
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      return gradient;
    };

    this.chart?.update();
  }
}
