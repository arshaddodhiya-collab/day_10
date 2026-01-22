import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestComponent } from './test/test.component';
import { QrcodeComponent } from './qrcode/qrcode.component';

const routes: Routes = [
  { path: '', component: TestComponent },
  { path: 'qrcode', component: QrcodeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
