import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Login } from '../../model/Login/login';
import { AdminService } from '../../service/admin/admin.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private adminService: AdminService, private router: Router) {

  }
  email: string = "";
  password: string = "";

  loginComponent: Login = new Login();
  loginerror: string = ''
  loginin() {
// <<<<<<< HEAD
   
//     this.loginComponent.email=this.email
//     this.loginComponent.password=this.password
//     if(this.loginComponent.email.charAt(0)=='&'){
//     this.adminService.login(this.loginComponent).subscribe(
//       {
//         next: (data) => {
//           sessionStorage.setItem("superAdmin",JSON.stringify(this.loginComponent))
//           this.router.navigateByUrl("/superAdmin/"+this.loginComponent.email)
//         },
//         error: (err) => {
//           console.log('vbnjk')
//           this.loginerror=err.error
//         },
//         complete: () => {
//           console.log("Server completed sending data.");
//         }
//       }
//     )
    
//   }
//   else if(this.loginComponent.email.charAt(0)=='$'){
//     this.adminService.login(this.loginComponent).subscribe(
//       {
//         next: (data) => {
//           sessionStorage.setItem("Admin",JSON.stringify(this.loginComponent))
//           this.router.navigateByUrl("/admin/"+this.loginComponent.email)
// =======

  


    this.loginComponent.email = this.email
    this.loginComponent.password = this.password
    if(this.loginComponent.email.charAt(0)=='$'){
    this.adminService.login(this.loginComponent).subscribe(
      {
        next: (data) => {
          sessionStorage.setItem("SuperAdmin",JSON.stringify(data))
          this.router.navigateByUrl("/superAdmin/"+this.loginComponent.email)
        },
        error: (err) => {
          
          alert("Error logging in: "+err.error);
        },
        complete: () => {
          console.log("Server completed sending data.");
        }
      }
    )
    // if(this.loginComponent.email.charAt(0)=='$'){
    // this.adminService.login(this.loginComponent).subscribe(
    //   {
    //     next: (data) => {
    //       sessionStorage.setItem("superAdmin",JSON.stringify(data))
    //       this.router.navigateByUrl("/superAdmin/"+this.loginComponent.email)
    //     },
    //     error: (err) => {
    //       console.log('vbnjk')
    //       this.loginerror=err.error
    //     },
    //     complete: () => {
    //       console.log("Server completed sending data.");
    //     }
    //   }
    // )

    }
    else if(this.loginComponent.email.charAt(0)=='&'){
    this.adminService.login(this.loginComponent).subscribe(
      {
        next: (data) => {
          // sessionStorage.setItem("Admin", JSON.stringify(this.loginComponent.email))
         sessionStorage.setItem("Admin", JSON.stringify(data))
          this.router.navigateByUrl("/admin/" + this.loginComponent.email)
        },
        error: (err) => {
          alert("Error logging in: "+err.Error);
        },
        complete: () => {
          console.log("Server completed sending data.");
        }
      }
    )
    }
    else if(this.loginComponent.email==""||this.loginComponent.password=="")
    {
      alert("Please Provide Valid Information")
    }
    else{
      alert("No admin in this email")
    }
  }
  checkBox: Boolean = false

  selected: string = "";
  login() {
    this.router.navigateByUrl('/superAdmin/' + this.email);
  }
  submit() {
    console.log(this.selected);
  }
}
