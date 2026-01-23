import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'report',
    loadChildren: () =>
      import('./feature/report/report.module').then((m) => m.ReportModule),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./feature/patients/patients.module').then(
        (m) => m.PatientsModule,
      ),
  },
  {
    path: 'realtime',
    loadChildren: () =>
      import('./feature/realtime/realtime.module').then(
        (m) => m.RealtimeModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
