import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Center } from '../../model/center/center';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  constructor(private httpClient: HttpClient) { }
  getCenterById(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:8090/center/getByID/' + id);
  }

  getCenterByAdminId(adminId: number): Observable<any> {
    return this.httpClient.get('http://localhost:8090/center/admin/'+adminId);
  }
}
