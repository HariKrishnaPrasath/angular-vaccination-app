import { Component, OnInit } from '@angular/core';
import { Center } from '../../../model/center/center';
import { CenterService } from '../../../service/center/center.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Search } from '../../../pipes/search';

@Component({
  selector: 'app-center',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,Search],
  templateUrl: './center.component.html',
  styleUrl: './center.component.css'
})
export class CenterComponent{
displayVaccines(_t21: any) {
throw new Error('Method not implemented.');
}
  query: any;
  message: string = "";
  errorMessage: string = "";
  centers: Center[] = [];

  constructor(private centerService: CenterService) {
    
    this.centerService.getAllCenters()
    .subscribe(
      {
        next: (data) => {
          console.log(data);
          this.centers = data;
          //this.centers = data.sort();

          this.message = "Displaying centers.";
          this.errorMessage = "";
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = "Couldn't Load Centers";
          this.message = "";
        },
        complete:() => {
          console.log("Server completed sending data.");
        }
      }
    );
   }  
}

   
