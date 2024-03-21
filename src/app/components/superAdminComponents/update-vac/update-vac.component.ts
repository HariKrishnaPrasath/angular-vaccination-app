import { Component, OnInit } from '@angular/core';
import { Vaccine } from '../../../model/vaccine/vaccine';
import { FormsModule } from '@angular/forms';
import { VaccineService } from '../../../service/vaccine/vaccine.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
    constructor(private vaccineService:VaccineService,private activatedRoute: ActivatedRoute){
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
    updateVac(){
      console.log(this.vaccine);
      
      this.vaccineService.updateVaccine(this.vaccine).subscribe({
        next: (data) => {
          console.log(data);
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
      let id = this.vaccine.vaccineId;
      this.vaccine = {};
      this.vaccine.vaccineId=id;
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
