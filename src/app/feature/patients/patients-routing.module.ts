import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientsFormComponent } from './patients-form/patients-form.component';
import { PatientsDetailComponent } from './patients-detail/patients-detail.component';


const routes: Routes = [
  {
    path: '',
    component: PatientsListComponent,
  },
  {
    path: 'new',
    component: PatientsFormComponent,
  },
  {
    path: ':id',
    component: PatientsDetailComponent,
  },
  {
    path: ':id/edit',
    component: PatientsFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
