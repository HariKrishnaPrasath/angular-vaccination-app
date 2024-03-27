import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../../model/patient/patient';
import { PatientService } from '../../../service/patient/patient.service';
import { Appointment } from '../../../model/appointment/appointment';
import { AppointmentService } from '../../../service/appointment/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificateService } from '../../../service/certificate/certificate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-myappointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './myappointments.component.html',
  styleUrl: './myappointments.component.css'
})
export class MyappointmentsComponent {

  createAppointment() {
  }
  newPatient: Patient = new Patient();
  appointments: Appointment[] = [];
  dateVal?: Date;

  constructor(private _snackBar: MatSnackBar,private patientService: PatientService, private appointmentService: AppointmentService,
    private router: Router, private route: ActivatedRoute, private certificateService: CertificateService) {
    this.newPatient = JSON.parse(sessionStorage.getItem('Patient')!);
    this.loadAppointmentByPatient();


  }
  openToast() {
    this._snackBar.open('Successfully generate PDF!', 'Close', {
      duration: 7000 // 7 seconds
    });
  }
  loadAppointmentByPatient() {
    this.appointmentService.getAppointmentByPatient(this.newPatient.patientId!).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.appointments = [...res];
        },
        error: (err) => console.log(err.error)

      }
    )
  }
  bookAppointment() {
    let parentUrl = this.route.parent?.snapshot.url.join('/')

    this.router.navigateByUrl(parentUrl + '/center');
  }
  generateCertificate(bookingId: number) {
    this.openToast()
    this.certificateService.generateCertificate(bookingId).subscribe((pdfBlob: Blob) => {
      const blob = new Blob([pdfBlob], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
