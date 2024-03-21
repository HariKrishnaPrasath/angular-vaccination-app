import { Component } from '@angular/core';
import { Admin } from '../../../model/admin/admin';
import { AdminService } from '../../../service/admin/admin.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  details:Admin=new Admin(0,'','','','','')
  updateDetails: Admin = new Admin()
  updateAdminSuccess: string = ''
  updateAdminError: string = ''
  deleteAdminSuccess: string = ''
  deleteAdminError: string = ''
  updateStatus: boolean = false
  // constructor(private adminService:AdminService,private router: Router){}
  // var obj=localStorage.getItem("Admin");
  // console.log(obj);
  // details: Admin = new Admin(0, '', '', '', '', '')
  constructor(private adminService: AdminService,private router: Router) {

    var obj = sessionStorage.getItem("Admin");
    var data;
    if (obj != null) {
      data = JSON.parse(obj)
      console.log(data);
    }
    this.adminService.getAdminByEmail(data.email).subscribe(
      {
        next: (data) => {
          
          this.details = data
          console.log(data);
          
        },
        error: (err) => {
          console.log("Error");
          console.log("Hello");
          
        },
        complete: () => {
          console.log("Server completed sending data.");
        }
      }
    )
  }
  delete() {
    if (confirm("Do you want to Delete Account.Once you deleted you can't get back"))
      this.adminService.deleteAdmin(this.details.adminId!).subscribe(
        {
          next: (data) => {
            this.deleteAdminError = ''
            this.deleteAdminSuccess = "Admin Deleted Sucessfully"
            console.log(data)
            this.logout()
          },
          error: (err) => {
            this.deleteAdminSuccess = ''
            this.deleteAdminError = "Something Went Wrong Please check your ID or Try Again"
          },
          complete: () => {
            console.log("Server completed sending data.");
          }
        }
      )
  }
  update() {
    this.updateDetails.email=this.details.email
    this.adminService.updateAdmin(this.updateDetails).subscribe(
      {
        next: (data) => {
          this.updateAdminError = ''
          this.updateAdminSuccess = "Admin Updated Successfully"
          console.log(data)
          this.adminService.getAdminByEmail(data.email).subscribe(
            {
              next: (data) => {
                this.details = data
              },
              error: (err) => {
                console.log("okok");
              },
              complete: () => {
                console.log("Server completed sending data.");
              }
            }
          )
        },
        error: (err) => {
          this.updateAdminSuccess = ''
          this.updateAdminError = "Something Went Wrong Please check your email or Try Again"
        },
        complete: () => {
          console.log("Server completed sending data.");
        }
      }
    )
  }
  logout(): void {
    this.router.navigateByUrl('');
  }

}
