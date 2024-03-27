import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Login } from '../../../model/Login/login';
import { AdminService } from '../../../service/admin/admin.service';
import { Admin } from '../../../model/admin/admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})

export class SuperAdminProfileComponent {
  details: Admin = new Admin(0, '', '', '', '', '')
  updateDetails: Admin = new Admin()
  updateAdminSuccess: string = ''
  updateAdminError: string = ''
  deleteAdminSuccess: string = ''
  deleteAdminError: string = ''
  updateStatus: boolean = false
  constructor(private _snackBar: MatSnackBar,private adminService: AdminService, private router: Router, private activatedRouter: ActivatedRoute) {
    var obj = sessionStorage.getItem("SuperAdmin");
    var data;
    if (obj != null) {
      data = JSON.parse(obj)
    }
    this.adminService.getAdminByEmail(data.email).subscribe(
      {
        next: (data) => {
          this.details = data

          this.updateDetails = { ...this.details }
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
  openToast() {
    this._snackBar.open('Successfully Updated!', 'Close', {
      duration: 7000 // 7 seconds
    });
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
    if(this.updateDetails.adminId==0||this.updateDetails.adminName==""||this.updateDetails.adminType==""||this.updateDetails.email==""||this.updateDetails.password==""||this.updateDetails.phoneNumber==""){
      alert("please provide valid information")
    }
    else
    this.adminService.updateAdmin(this.updateDetails).subscribe(
      {
        next: (data) => {
          this.updateAdminError = ''
          this.openToast()
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


