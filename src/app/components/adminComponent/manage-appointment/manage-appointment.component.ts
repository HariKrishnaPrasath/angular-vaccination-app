import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../../service/patient/patient.service';
import { Patient } from '../../../model/patient/patient';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppointmentService } from '../../../service/appointment/appointment.service';
import { Appointment } from '../../../model/appointment/appointment';
import { Center } from '../../../model/center/center';
import { VaccinationStatusDTO } from '../../../model/vaccinationStatusDTO/vaccination-status-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-manage-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLinkActive],
  templateUrl: './manage-appointment.component.html',
  styleUrl: './manage-appointment.component.css'
})
export class ManageAppointmentComponent {


  // patientList: Patient[] = [];
  // newPatient: Patient = new Patient();


  constructor(private _snackBar: MatSnackBar,private patientService: PatientService, private appointmentService: AppointmentService) {
    let data = JSON.parse(sessionStorage.getItem('Center')!);
    this.center = data;

  }
  openToast() {
    this._snackBar.open('Successfully Update', 'Close', {
      duration: 7000 // 7 seconds
    });
  }
  addStatus: boolean = false;
  newAppointment: Appointment = new Appointment();
  appointments: Appointment[] = [];
  center?: Center;
  vaccinationStatusDTO: VaccinationStatusDTO = new VaccinationStatusDTO();

  ngOnInit() {

    this.loadAppointmentForCenter();
    // this.patientService.getAllPatients().subscribe(
    //   {
    //     next: (data) => {
    //       this.patientList = [...data];
    //       console.log(data);
    //       console.log(this.patientList);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     }
    //   }
    // );
  }
  loadAppointmentForCenter() {
    this.appointmentService.getAppointmentForCenter(this.center?.centerId!).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.appointments = [...res];
        }
      }
    )
  }
  checkAppointment(appointment: Appointment) {
    this.addStatus = true;
    this.newAppointment = { ...appointment };

  }
  updateAppointment(updateAppointment: Appointment) {
    
    this.vaccinationStatusDTO.appointmentId = updateAppointment.bookingId;
    this.vaccinationStatusDTO.isVaccinated = !updateAppointment.vaccineStatus;

    console.log(this.vaccinationStatusDTO);
    
    this.appointmentService.updateAppointmentStatus(this.vaccinationStatusDTO).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.loadAppointmentForCenter();
          this.openToast();
          this.newAppointment.vaccineStatus=this.vaccinationStatusDTO.isVaccinated
        },
        error: (err) => {
          console.log(err);
          
        }
      }
    )
  }
}

