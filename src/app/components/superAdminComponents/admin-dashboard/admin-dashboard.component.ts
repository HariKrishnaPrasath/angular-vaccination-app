import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Admin } from '../../../model/admin/admin';
import { AdminService } from '../../../service/admin/admin.service';
import { PatientService } from '../../../service/patient/patient.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  superAdmin:number=0
  admin:number=0
  login:number=0
  accounts:Admin[]=[]
  constructor(private adminService:AdminService,private patientService:PatientService){
    this.patientService.getAllPatients().subscribe(
      {
        next:(data)=>{
          this.login=6
        },
        error:(err)=>{
          console.log(err)
        }
      }
    )
    this.adminService.searchAdmin().subscribe(
      {
        next: (data) => {
          this.accounts=[]
          this.accounts=data
          for (let i = 0; i < this.accounts.length; i++) {
            if(this.accounts[i].adminType=="SUPER"){
              this.superAdmin+=1
            }
            else if(this.accounts[i].adminType=="ADMIN"){
              this.admin+=1
            }
          }
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          console.log("Server completed sending data.");
        }
      }
    )
  }
}
