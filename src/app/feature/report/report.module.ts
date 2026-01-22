import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { TestComponent } from './test/test.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [TestComponent],
  imports: [CommonModule, ReportRoutingModule, TableModule, ButtonModule],
})
export class ReportModule {}
