import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Patient } from '../../model/patient/patient';
import { PatientService } from '../../service/patient/patient.service';
import { Login } from '../../model/Login/login';
@Component({
  selector: 'app-patient-login',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,FormsModule],
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.css'
})
export class PatientLoginComponent {
  checkBox:boolean=false;
  password: string="";
  constructor(private patientservice:PatientService,private router:Router){}
  newPatient : Patient = new Patient();
  newLogin : Login = new Login();
  addPatient() {
    if(this.checkPassword()){
    this.patientservice.addPatient(this.newPatient).subscribe(
      {
        next: (response) => {
          sessionStorage.setItem("Patient",JSON.stringify(response))
          console.log(response);
        },
        error: (e) => {
          alert("Error adding the patient");
        },
        complete: ()=>{
          // Redirect to login page on successful registration
          this.router.navigateByUrl('user/' + this.newPatient.email);
          }
      }
    )
    }
    else window.alert("Passwords do not match");
  }
  checkPassword():boolean{
    if(this.password === this.newPatient.password) return true;
    return false;
  }
  patientLogin() {
    this.patientservice.loginPatient(this.newLogin).subscribe(
      {
        next: (response) => {
          sessionStorage.setItem("Patient",JSON.stringify(response))
          console.log(response.email);
          this.router.navigateByUrl('user/' + response.email);

        },
        error: (e) => {
          alert("Error logging in");
        },
        complete: ()=>{
          // Redirect to login page on successful registration
          }
      }
    )
  }

}
