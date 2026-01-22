import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patients: Patient[] = [
    {
      id: 1,
      name: 'Arjun Patel',
      age: 32,
      gender: 'Male',
      phone: '9876543210',
      email: 'arjun@test.com',
    },
  ];

  getPatients(): Observable<Patient[]> {
    return of(this.patients);
  }

  getPatientById(id: number): Observable<Patient | undefined> {
    return of(this.patients.find(p => p.id === id));
  }

  addPatient(patient: Patient): Observable<Patient> {
    this.patients.push(patient);
    return of(patient);
  }

  updatePatient(patient: Patient): Observable<Patient> {
    const index = this.patients.findIndex(p => p.id === patient.id);
    this.patients[index] = patient;
    return of(patient);
  }

  deletePatient(id: number): Observable<void> {
    this.patients = this.patients.filter(p => p.id !== id);
    return of();
  }
}
