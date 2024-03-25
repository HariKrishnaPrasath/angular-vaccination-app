import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../../model/appointment/appointment';
import { Observable } from 'rxjs';
import { VaccinationStatusDTO } from '../../model/vaccinationStatusDTO/vaccination-status-dto';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient) { }
  bookAnAppointment(appointment: Appointment): Observable<any> {
    return this.httpClient.post('http://localhost:8090/api/appointments/add',appointment);
  }
  getAppointmentByPatient(patientId: number): Observable<any> {
    return this.httpClient.get('http://localhost:8090/api/appointments/id',{
      params: {
        patientId : patientId
      }
    })
  }
  getAppointmentForCenter(centerId: number): Observable<any> {
    return this.httpClient.get('http://localhost:8090/api/appointments/vaccinationCenters/'+centerId);
  }
  updateAppointmentStatus(appointmentStatus: VaccinationStatusDTO): Observable<any> {
    return this.httpClient.put('http://localhost:8090/api/appointments/vaccinationStatus',appointmentStatus);
  }
   
}
