import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientsDetailComponent } from './patients-detail/patients-detail.component';
import { PatientsFormComponent } from './patients-form/patients-form.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';


@NgModule({
  declarations: [
    PatientsListComponent,
    PatientsDetailComponent,
    PatientsFormComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
