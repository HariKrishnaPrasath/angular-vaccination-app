import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../../model/patient/patient';
import { PatientService } from '../../../service/patient/patient.service';

@Component({
  selector: 'app-myappointments',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './myappointments.component.html',
  styleUrl: './myappointments.component.css'
})
export class MyappointmentsComponent {
createAppointment() {
throw new Error('Method not implemented.');
}
  newPatient : Patient = new Patient();
  constructor(private patientService:PatientService){
    this.newPatient= JSON.parse(sessionStorage.getItem('Patient')!);
  }

}
