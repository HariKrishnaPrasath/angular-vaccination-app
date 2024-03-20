import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../model/Login/login';
import { Admin } from '../../model/admin/admin';

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
    addAdmin(adminDetails:Admin):Observable<any>{
      return this.httpClient.post("http://localhost:8090/vaccinationapp/admin/add",adminDetails)
    }
    deleteAdmin(adminId:number):Observable<any>{
      return this.httpClient.delete("http://localhost:8090/vaccinationapp/admin/deleteadmin/"+adminId)
    }
    searchById(adminId:number):Observable<any>{
      return this.httpClient.get("http://localhost:8090/vaccinationapp/admin/getadminbyid/"+adminId)
    }
    searchByEmail(adminEmail:string):Observable<any>{
      return this.httpClient.get("http://localhost:8090/vaccinationapp/admin/getbyemail/"+adminEmail)
    }
    searchAdmin():Observable<any>{
      return this.httpClient.get("http://localhost:8090/vaccinationapp/admin/getalladmin")
    }
    updateAdmin(adminDetails:Admin):Observable<any>{
      return this.httpClient.put("http://localhost:8090/vaccinationapp/admin/update",adminDetails)
    }
}
