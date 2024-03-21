import { Component } from '@angular/core';
import { Vaccine } from '../../../model/vaccine/vaccine';
import { FormsModule } from '@angular/forms';
import { VaccineService } from '../../../service/vaccine/vaccine.service';
import { CommonModule } from '@angular/common';
//import { Router } from '@angular/router';
@Component({
  selector: 'app-create-vac',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './create-vac.component.html',
  styleUrl: './create-vac.component.css'
})

export class CreateVacComponent {
  vaccine: Vaccine = new Vaccine(); // Initialize an empty Vaccine object
  message: string = '';
  errorMessage: string = '';

  constructor(private vaccineService:VaccineService){
  }
  

  createVac(): void {
    this.vaccineService.createVaccine(this.vaccine).subscribe({
      next:(data) => {
        console.log('New Vaccine:', this.vaccine);
        alert("created vaccine");
        this.vaccine = new Vaccine();
      },
      error:(error) => {console.error('There was an error!',error);
      alert("Error creating the vaccine");
    }
    });
  }
  /*goBackToPrevPage(): void {
    this.router.navigate(['http://localhost:4200/superAdmin/null/allVaccines']); 
  }*/
}
