import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vaccine } from '../../model/vaccine/vaccine';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  constructor(private httpClient:HttpClient) { }
  getAllVaccine():Observable<any>{
    return this.httpClient.get("http://localhost:8090/vaccine/getAllvaccine");
  }
  private url = 'http://localhost:8090/vaccine/deleteById';
  deleteById(id?:number):Observable<any>{
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  createVaccine(vaccine?:Vaccine):Observable<any>{
    return this.httpClient.post("http://localhost:8090/vaccine/create", vaccine);
  }
  updateVaccine(vaccine?: Vaccine): Observable<any> {
    return this.httpClient.put("http://localhost:8090/vaccine/update", vaccine);
  }
  getById(id?:string):Observable<any>{
    return this.httpClient.get("http://localhost:8090/vaccine/"+id)
  }

}

