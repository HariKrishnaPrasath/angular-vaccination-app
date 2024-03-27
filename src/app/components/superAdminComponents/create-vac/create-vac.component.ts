import { Component } from '@angular/core';
import { Vaccine } from '../../../model/vaccine/vaccine';
import { FormsModule } from '@angular/forms';
import { VaccineService } from '../../../service/vaccine/vaccine.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private _snackBar: MatSnackBar,private vaccineService:VaccineService,private location: Location){
  }
  
  openToast() {
    this._snackBar.open('Vaccine Added Successfully!', 'Close', {
      duration: 7000 // 7 seconds
    });
  }
  createVac(): void {
    this.vaccineService.createVaccine(this.vaccine).subscribe({
      next:(data) => {
        console.log('New Vaccine:', this.vaccine);
        alert("created vaccine");
        this.vaccine = new Vaccine();
        this.openToast()
      },
      error:(error) => {console.error('There was an error!',error);
      alert("Error creating the vaccine");
    }
    });
  }
  goBackToPrevPage(): void {
    //console.log('vanthuten');
    this.location.back();
  }
  /*goBackToPrevPage(): void {
    this.router.navigate(['http://localhost:4200/superAdmin/null/allVaccines']); 
  }*/
}
