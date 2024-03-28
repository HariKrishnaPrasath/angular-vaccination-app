import { Component, OnInit } from '@angular/core';
import { Center } from '../../../model/center/center';
import { CenterService } from '../../../service/center/center.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Search } from '../../../pipes/search';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PatientService } from '../../../service/patient/patient.service';
import { SlotService } from '../../../service/slot/slot.service';

@Component({
  selector: 'app-center',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, Search, RouterLinkActive, RouterOutlet, RouterLink],
  templateUrl: './center.component.html',
  styleUrl: './center.component.css'
})
export class CenterComponent {
  displayVaccines(_t21: any) {
    throw new Error('Method not implemented.');
  }
  centers: Center[] = [];

  constructor(private patientService: PatientService, private centerService: CenterService,
    private slotService: SlotService, private router: Router, private route: ActivatedRoute) {
    this.loadAllCenter();
  }

  loadAllCenter() {
    this.centerService.getAllCenters().subscribe({
      next: (res) => {
        console.log(res);
        this.centers = [...res];
      },
      error: (err) => {
        console.log(err.error);

      }
    });
  }
  selectCenter(centerId?: number) {
    let parentUrl = this.route.parent?.snapshot.url.join('/')

    this.router.navigateByUrl(parentUrl + '/viewCenter/' + centerId);
  }
  name:string=""
  dup:Center[]=[]
  query:string=""
  search(){
    if(this.name=="")
    {
      this.loadAllCenter()
    }
    for(let i of this.centers)
    {
      console.log("1")
      if(i.centerName?.toUpperCase().includes(this.name.toUpperCase()))
      {
        
        this.dup.push(i)
      }
    }
    this.name=""
    this.name=""
    this.centers=this.dup
    this.dup=[]
    this.dup=[]
  }
}
// query: any;
// message: string = "";
// errorMessage: string = "";
// centers: Center[] = [];

// constructor(private centerService: CenterService) {

//   this.centerService.getAllCenters()
//     .subscribe(
//       {
//         next: (data) => {
//           console.log(data);
//           this.centers = data;
//           //this.centers = data.sort();

//           this.message = "Displaying centers.";
//           this.errorMessage = "";
//         },
//         error: (err) => {
//           console.log(err);
//           this.errorMessage = "Couldn't Load Centers";
//           this.message = "";
//         },
//         complete: () => {
//           console.log("Server completed sending data.");
//         }
//       }
//     );
// }  
// }


