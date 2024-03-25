import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Center } from '../../model/center/center';
import { Observable } from 'rxjs';
import { Vaccine } from '../../model/vaccine/vaccine';

@Injectable({
  providedIn: 'root'
})
export class CenterService {
  constructor(private httpClient: HttpClient) { }
  addNewCenter(newCenter: Center): Observable<any> {
    return this.httpClient.post("http://localhost:8090/center/create",newCenter);
  }

  deleteCenterById(id?: number):Observable<any>{
    return this.httpClient.delete("http://localhost:8090/center/"+id+"/remove");
  }

  getAllCenters(): Observable<any> {
    return this.httpClient.get("http://localhost:8090/center/getAllCenter");
  }

  getCenterById(id?: number):Observable<any>{
    return this.httpClient.get("http://localhost:8090/center/getByID/"+id);
  }

  updateCenterByCenter(center:Center):Observable<any>{
    return this.httpClient.put("http://localhost:8090/center/update",center);
  }
  getCenterByAdminId(adminId: number): Observable<any> {
    return this.httpClient.get('http://localhost:8090/center/admin/'+adminId);
  }
  // getAllCenter(): Observable<any> {
  //   return this.httpClient.get('http://localhost:8090/center/getAllCenter');
  // }
  addVaccineToCenter(centerId: number, vaccine: Vaccine): Observable<any> {
    return this.httpClient.put('http://localhost:8090/center/' + centerId + '/addVaccine', vaccine);
  }
  getAllVaccinesInCenter(centerId: number): Observable<any> {
    return this.httpClient.get('http://localhost:8090/center/getAllVaccinesInCenter/'+centerId);
  }
  removeVaccineFromCenter(centerId: number, vaccineId: number): Observable<any> {
    return this.httpClient.delete('http://localhost:8090/center/'+centerId+'/removeVaccine/'+vaccineId)
  }
}
