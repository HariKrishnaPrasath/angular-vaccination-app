import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../model/Login/login';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private httpClient:HttpClient) {}
    login(logincom:Login):Observable<any>{
      return this.httpClient.post('http://localhost:8090/admin/login',logincom);
    }
    getAdminByEmail(email:string):Observable<any>{
      return this.httpClient.get("http://localhost:8090/vaccinationapp/admin/getbyemail/"+email);
    }
}
