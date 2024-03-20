import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../../service/patient/patient.service';
import { Patient } from '../../../model/patient/patient';
import { RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manage-appointment',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,RouterLinkActive],
  templateUrl: './manage-appointment.component.html',
  styleUrl: './manage-appointment.component.css'
})
export class ManageAppointmentComponent {
checkAppointment(patient: Patient) {
  this.addStatus = true;
  this.newPatient = {...patient};

}
  patientList:Patient[]=[];
  newPatient: Patient=new Patient();
  constructor(private patientService:PatientService){}
  addStatus:boolean = false;
  ngOnInit() {
    this.patientService.getAllPatients().subscribe(
      {
        next:(data)=>{
          this.patientList=[...data];
          console.log(data);
          console.log(this.patientList);
        },
        error:(err)=>{
          console.log(err);
        }
      }
    );
} 
}

