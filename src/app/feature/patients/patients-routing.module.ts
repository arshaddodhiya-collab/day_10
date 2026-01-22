import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientFormComponent } from './patients-form/patients-form.component';
import { PatientsDetailComponent } from './patients-detail/patients-detail.component';


const routes: Routes = [
  {
    path: '',
    component: PatientsListComponent,
  },
  {
    path: 'new',
    component: PatientFormComponent,
  },
  {
    path: ':id',
    component: PatientsDetailComponent,
  },
  {
    path: ':id/edit',
    component: PatientFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
