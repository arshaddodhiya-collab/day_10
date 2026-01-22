import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientsDetailComponent } from './patients-detail/patients-detail.component';
import { PatientFormComponent } from './patients-form/patients-form.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';


@NgModule({
  declarations: [
    PatientsListComponent,
    PatientsDetailComponent,
    PatientFormComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PatientsRoutingModule,
    DialogModule,
    CardModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    InputTextModule
  ]
})
export class PatientsModule { }
