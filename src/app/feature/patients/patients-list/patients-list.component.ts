import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient.model';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patients-list.component.html',
})
export class PatientsListComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(data => {
      this.patients = data;
    });
  }
}
