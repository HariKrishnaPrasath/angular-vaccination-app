import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private httpClient: HttpClient) { }
  generateCertificate(bookingId: number):Observable<any> {
    return this.httpClient.get("http://localhost:8090/export-to-pdf/"+bookingId,  { responseType: 'blob' });
  }
}
