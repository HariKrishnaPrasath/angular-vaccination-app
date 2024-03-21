import { Component } from '@angular/core';
import { Vaccine } from '../../../model/vaccine/vaccine';
import { VaccineService } from '../../../service/vaccine/vaccine.service';

@Component({
  selector: 'app-all-vacs',
  standalone: true,
  imports: [],
  templateUrl: './all-vacs.component.html',
  styleUrl: './all-vacs.component.css'
})
export class AllVacsComponent {
  constructor(
    private vaccineService: VaccineService){}
    vaccine: Vaccine = new Vaccine(); 
    vaccineArray:Vaccine[]=[];

}
