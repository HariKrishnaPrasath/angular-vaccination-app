import { Component, OnInit } from '@angular/core';
import { Vaccine } from '../../../model/vaccine/vaccine';
import { VaccineService } from '../../../service/vaccine/vaccine.service';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Center } from '../../../model/center/center';
import { CenterService } from '../../../service/center/center.service';

@Component({
  selector: 'app-all-vacs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLinkActive],
  templateUrl: './all-vacs.component.html',
  styleUrl: './all-vacs.component.css'
})
export class AllVacsComponent implements OnInit {

  parentUrl: string;

  vaccine: Vaccine = new Vaccine();
  vaccineArray: Vaccine[] = [];
  center: Center = new Center();


  constructor(
    private vaccineService: VaccineService,
    private route: ActivatedRoute, private router: Router, private centerService: CenterService) {
    this.parentUrl = this.route.parent?.snapshot.url.join('/')!;

    this.center = JSON.parse(sessionStorage.getItem('Center')!)
  }
  ngOnInit() {
    this.loadVaccinesInCenter();
  }
  addVaccine() {
    this.router.navigateByUrl(this.parentUrl + '/addVaccines');
  }
  loadVaccinesInCenter() {
    this.centerService.getAllVaccinesInCenter(this.center.centerId!).subscribe(
      {
        next: (res) => {
          console.log();
          this.vaccineArray = [...res];
        },
        error: (err)=>{
          if (err.error == "There is no any vaccines available in this center currently")
            this.vaccineArray = [];
        }
      }
    )
  }
  removeVaccine(vaccine: Vaccine) {
    this.centerService.removeVaccineFromCenter(this.center.centerId!, vaccine.vaccineId!).subscribe({
      next: (res) => {
        console.log(res);
        this.loadVaccinesInCenter();
      }, 
      error: (err) => {
        console.log(err);
        
      }
    }) 
  }
  name:string=""
  dup:Vaccine[]=[]
  search(){
    for(let i of this.vaccineArray)
    {
      if(i.vaccineName?.toLowerCase().includes(this.name.toLowerCase()))
      {
        this.dup.push(i)
      }
    }
    this.vaccineArray=this.dup
  }
}
