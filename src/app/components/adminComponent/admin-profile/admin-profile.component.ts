import { Component } from '@angular/core';
import { Admin } from '../../../model/admin/admin';
import { AdminService } from '../../../service/admin/admin.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  details:Admin=new Admin(0,'','','','','')
  constructor(private adminService:AdminService){
  var obj=sessionStorage.getItem("Admin");
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
          console.log("Error");
        },
        complete: () => {
          console.log("Server completed sending data.");
        }
      }
    )
  }
}
