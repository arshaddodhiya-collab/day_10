import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../models/patient.model';
import { PatientService } from '../services/patient.service';


@Component({
  selector: 'app-patient-detail',
  templateUrl: './patients-detail.component.html',
})
export class PatientsDetailComponent implements OnInit {
  patient?: Patient;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.patientService.getPatientById(id).subscribe(p => {
      this.patient = p;
    });
  }
}
