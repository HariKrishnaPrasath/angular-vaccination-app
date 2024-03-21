import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Login } from '../../../model/Login/login';
import { AdminService } from '../../../service/admin/admin.service';
import { Admin } from '../../../model/admin/admin';
@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [],
  templateUrl: './super-admin-profile.component.html',
  styleUrl: './super-admin-profile.component.css'
})

export class SuperAdminProfileComponent {
  details:Admin=new Admin(0,'','','','','')
  constructor(private adminService:AdminService){
  var obj=sessionStorage.getItem("superAdmin");
    var data;
    if(obj !=null){
      data=JSON.parse(obj)
    }
    this.adminService.getAdminByEmail(data.email).subscribe(
      {
        next: (data) => {
          this.details=data
        },
        error: (err) => {
          console.log("okok");
        },
        complete: () => {
          console.log("Server completed sending data.");
        }
      }
    )
  }

  
}


