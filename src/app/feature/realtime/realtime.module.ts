import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { RealtimeRoutingModule } from './realtime-routing.module';
import { RealtimeDashboardComponent } from './components/realtime-dashboard/realtime-dashboard.component';
import { LiveTickerComponent } from './components/live-ticker/live-ticker.component';
import { OptimizedListComponent } from './components/optimized-list/optimized-list.component';
import { RealtimeChartComponent } from './components/realtime-chart/realtime-chart.component';

@NgModule({
  declarations: [
    RealtimeDashboardComponent,
    LiveTickerComponent,
    OptimizedListComponent,
    RealtimeChartComponent,
  ],
  imports: [CommonModule, RealtimeRoutingModule, NgChartsModule],
})
export class RealtimeModule {}
