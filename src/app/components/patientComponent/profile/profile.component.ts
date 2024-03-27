import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../service/patient/patient.service';
import { Patient } from '../../../model/patient/patient';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  newPatient: Patient = new Patient();
  existingPatient: Patient = new Patient();
  patientId?: number;
  checkBox: boolean = false;
  updatedPatient: Patient = new Patient();
  constructor(private patientService: PatientService,private router:Router) { 
    
    this.patientId = JSON.parse(sessionStorage.getItem('Patient')!).patientId;
    console.log(this.patientId)
  }
  logout() : void {
    this.router.navigateByUrl('patient/login');
  }
  ngOnInit(): void {
    this.patientService.getPatientById(this.patientId!).subscribe(
      {
        next: (response) => {
          this.newPatient = response;
          this.existingPatient = {...this.newPatient};
          console.log(response);
        },
        error: (e) => {
          alert("Error adding the patient");
        },
        complete: () => { }
      }
    )
  }
  getPatient() {
    this.patientService.getPatientById(this.patientId!).subscribe(
      {
        next: (response) => {
          this.newPatient = response;
          this.existingPatient = {...this.newPatient};
          console.log(response);
        },
        error: (e) => {
          alert("Error adding the patient");
        },
        complete: () => { }
      }
    )
  }
  deletePatient() {
    if(confirm("Are you sure do you want to delete your account"))
    this.patientService.deletePatient(this.patientId!).subscribe(
      {
        next: (response) => {
          window.alert("The patient has been deleted");
          this.router.navigateByUrl("patient/login")
        },
        error: (e) => {
          alert("Error deleting account");
        },
        complete: () => { }
      }
    )
  }
  updatePatient() {
    
    // this.existingPatient=JSON.parse(sessionStorage.getItem('Patient')!);
    this.patientService.updatePatient(this.existingPatient).subscribe(
      {
        next: (response) => {
          this.getPatient();
          this.checkBox=false;
        },
        error: (e) => {
          alert("Error updating account");
        },
        complete: () => { }
      }
    )
      }
}
