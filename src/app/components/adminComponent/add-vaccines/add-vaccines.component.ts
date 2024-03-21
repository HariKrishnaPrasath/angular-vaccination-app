import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaccineService } from '../../../service/vaccine/vaccine.service';
import { Vaccine } from '../../../model/vaccine/vaccine';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-vaccines',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-vaccines.component.html',
  styleUrl: './add-vaccines.component.css'

})

export class AddVaccinesComponent {
  constructor(
    private vaccineService: VaccineService){}
    vaccine: Vaccine = new Vaccine(); 
    vaccineArray:Vaccine[]=[];
}


