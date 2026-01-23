import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealtimeDashboardComponent } from './components/realtime-dashboard/realtime-dashboard.component';

const routes: Routes = [{ path: '', component: RealtimeDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealtimeRoutingModule {}
