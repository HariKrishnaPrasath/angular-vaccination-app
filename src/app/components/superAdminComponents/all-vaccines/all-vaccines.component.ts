import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { VaccineService } from '../../../service/vaccine/vaccine.service';
import { Vaccine } from '../../../model/vaccine/vaccine';

@Component({
  selector: 'app-all-vaccines',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './all-vaccines.component.html',
  styleUrl: './all-vaccines.component.css'
})
export class AllVaccinesComponent {
  email: string;
  query: any;

  constructor(
    private vaccineService: VaccineService,
    private router: Router,
    private routerSnap: ActivatedRoute
  ) {
    this.email = this.routerSnap.snapshot.paramMap.get('email')!;
    
  }
  message: string = '';
  errorMessage: string = '';
  vaccineArray:Vaccine[]=[];
  ngOnInit(): void {
    this.vaccineService.getAllVaccine().subscribe({
      next: (data) => {
        console.log(data);
        this.vaccineArray=data;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = "Could't Load Vaccines";
        this.message = "";
      },
      complete: () => {
        console.log("Server completed sending data.");

      }
    }); 
  }
 deleteVaccine(id?: number) {
    console.log("delete id:" + id);
    if (confirm("Do you want to Delete Vaccine id:" + id))
      this.vaccineService.deleteById(id).subscribe(
        {
          next: (data) => {
            console.log('Vaccine deleted successfully', data);
            // delete account with id in local array
            this.vaccineArray = this.vaccineArray.filter((a) => a.vaccineId != id);
            this.message = "Deleted Account with id:" + id;
            this.errorMessage = "";
            //this.router.navigateByUrl('superAdmin/' + this.email +'allVaccines');
          },
          error: (err) => {
            console.log(err);
            this.message = "";
            this.errorMessage = "Coule not Delete Vaccine.";
          }
        }
      
      );
    
  }
  
  updateVaccine(vaccine:Vaccine) {
    this.router.navigateByUrl('superAdmin/' + this.email + '/updateVac/'+ vaccine.vaccineId);
  }
  createVaccine() {
    this.router.navigateByUrl('superAdmin/' + this.email + '/createVac');
  }
  name:string=""
  dup:Vaccine[]=[]
  search(){
    for(let i of this.vaccineArray)
    {
      if(i.vaccineName?.toLocaleLowerCase==this.name.toLocaleLowerCase)
      {
        this.dup.push(i)
      }
    }
    this.vaccineArray=this.dup
  }
}


