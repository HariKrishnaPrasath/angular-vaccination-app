import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { consumerBeforeComputation } from '@angular/core/primitives/signals';
import { Observable } from 'rxjs';
import { Slot } from '../../model/slot/slot';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  constructor(private httpClient: HttpClient) { }
  getAllSlotsByCenterId(centerId: number): Observable<any> {
    return this.httpClient.get('http://localhost:8090/slot/center/' + centerId);
  }
  createSlot(slot: Slot): Observable<any> {
    return this.httpClient.post('http://localhost:8090/slot',slot);
  }
  updateSlot(updateSlot: Slot): Observable<any> {
    return this.httpClient.put('http://localhost:8090/slot', updateSlot);
  }
  deleteSlotById(slotId: number): Observable<any> {
    return this.httpClient.delete('http://localhost:8090/slot/'+ slotId);
  }
}
