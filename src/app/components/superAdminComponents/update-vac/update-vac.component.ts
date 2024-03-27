import { Component, OnInit } from '@angular/core';
import { Vaccine } from '../../../model/vaccine/vaccine';
import { FormsModule } from '@angular/forms';
import { VaccineService } from '../../../service/vaccine/vaccine.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-update-vac',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './update-vac.component.html',
  styleUrl: './update-vac.component.css'
})
export class UpdateVacComponent implements OnInit{
    vaccine: Vaccine = new Vaccine(); 
    id: string="";
    message:string="";
    errorMessage:string="";
    constructor(private _snackBar: MatSnackBar,private vaccineService:VaccineService,private activatedRoute: ActivatedRoute,private location: Location){
      this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
      console.log(this.id);
    }
    ngOnInit(): void{
      this.vaccineService.getById(this.id).subscribe(
        {
          next: (data) => {
            console.log(data);
            this.vaccine=data;
  
          },
          error: (err) => {
            console.log(err);
            this.errorMessage = err.message;
          }
        }
      );
    }
    openToast() {
      this._snackBar.open('Vaccine Updated Successfully!', 'Close', {
        duration: 7000 // 7 seconds
      });
    }
    updateVac(){
      console.log(this.vaccine);
      
      this.vaccineService.updateVaccine(this.vaccine).subscribe({
        next: (data) => {
          console.log(data);
          this.openToast()
          this.vaccine = data;
          this.message= "vaccine details succesfully updated";
          //this.validation=false;
        },
        error: (err) => {
          console.log(err);
          this.errorMessage="Cannot Update vaccine Details";
        }
  
      });
    }
    clear(){
      this.location.back();
    }
    /*onSubmit(): void {
      this.vaccineService.updateVaccine(this.vaccine).subscribe({
        next:(data) => {
          console.log('New Vaccine:', this.vaccine);
          alert("created vaccine");
          this.vaccine = new Vaccine('', new Date(), new Date(), '', 0);
        },
        error:(error) => {console.error('There was an error!',error);
        alert("Error creating the vaccine");
      }
      });
  
    
}*/
}
