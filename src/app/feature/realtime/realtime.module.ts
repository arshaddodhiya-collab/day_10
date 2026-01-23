import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealtimeRoutingModule } from './realtime-routing.module';
import { RealtimeDashboardComponent } from './components/realtime-dashboard/realtime-dashboard.component';
import { LiveTickerComponent } from './components/live-ticker/live-ticker.component';
import { OptimizedListComponent } from './components/optimized-list/optimized-list.component';

@NgModule({
  declarations: [
    RealtimeDashboardComponent,
    LiveTickerComponent,
    OptimizedListComponent,
  ],
  imports: [CommonModule, RealtimeRoutingModule],
})
export class RealtimeModule {}
