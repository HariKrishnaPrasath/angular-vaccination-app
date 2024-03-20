import { Injectable } from '@angular/core';
import { Patient } from '../../model/patient/patient';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../model/Login/login';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private httpClient:HttpClient) { }
  getPatientById(patientId:number):Observable<any> {
    return this.httpClient.get('http://localhost:8090/patient/'+patientId);  
    }
  addPatient(newPatient: Patient): Observable<any>{
    return this.httpClient.post('http://localhost:8090/patient',newPatient);  
  }
  loginPatient(newLogin: Login):Observable<any> {
    return this.httpClient.post('http://localhost:8090/patient/login',newLogin);
  }
  deletePatient(patientId:number):Observable<any> {
    return this.httpClient.delete('http://localhost:8090/patient/delete/'+patientId);  
    }
    updatePatient(newPatient: Patient):Observable<any> {
      return this.httpClient.put('http://localhost:8090/patient/update',newPatient);  
    }
    getAllPatients():Observable<any>{
      return this.httpClient.get('http://localhost:8090/patients');    
    }
}
