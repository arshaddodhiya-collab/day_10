import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patients-form.component.html',
})
export class PatientFormComponent implements OnInit {
  isEdit = false;

  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  patientForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(1)]],
    gender: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.patientService.getPatientById(+id).subscribe((p) => {
        if (p) this.patientForm.patchValue(p);
      });
    }
  }

  submit(): void {
    if (this.patientForm.invalid) return;

    const patient = this.patientForm.value as any;

    if (this.isEdit) {
      this.patientService.updatePatient(patient).subscribe(() => {
        this.router.navigate(['/patients']);
      });
    } else {
      patient.id = Date.now();
      this.patientService.addPatient(patient).subscribe(() => {
        this.router.navigate(['/patients']);
      });
    }
  }
}
