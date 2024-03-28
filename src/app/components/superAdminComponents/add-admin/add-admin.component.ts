import { Component } from '@angular/core';
import { AdminService } from '../../../service/admin/admin.service';
import { Admin } from '../../../model/admin/admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {
  constructor(private adminService:AdminService,private _snackBar: MatSnackBar){
    this.adminService.searchAdmin().subscribe(
      {
        next: (data) => {
          this.accounts=[]
          this.accounts=data
          console.log(data)
          this.searchId=undefined
          this.searchError=''
            this.addAdminSuccess=''
            this.addAdminError=''
            this.deleteAdminError=''
            this.deleteAdminSuccess=''
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
  
openToast() {
  this._snackBar.open('Successfully updated!', 'Close', {
    duration: 7000 // 7 seconds
  });
}
  adminDetails:Admin=new Admin(0,'','','','','')
  idStatus:boolean=false
  emailStatus:boolean=true
  nameStatus:boolean=false
  add:boolean=true
  update:boolean=false
  delete:boolean=false
  search:boolean=false
  adminID:number=0
  searchString:number|string|undefined
  searchId:number | undefined
  searchEmail:string=''
  accounts:Admin[]=[]
  addAdminSuccess:string=''
  addAdminError:string=''
  updateAdminSuccess:string=''
  deleteAdminError:string=''
  deleteAdminSuccess:string=''
  updateAdminError:string=''
  addStatus:boolean=false
  searchError:string=''

  adminDup:Admin[]=[]
  addAdmin(){
    console.log(this.adminDetails);
    if(this.adminDetails.adminName==""||this.adminDetails.adminType==""||this.adminDetails.email==""||this.adminDetails.password==""||this.adminDetails.phoneNumber==""){
      alert("please provide valid information")
    }
    else{
    this.adminService.addAdmin(this.adminDetails).subscribe(
      {
        next: (data) => {
          this.addAdminError=''
          this.searchError=''
          this.deleteAdminSuccess=''
          this.deleteAdminError=''
          this.openToast()
          this.adminService.searchAdmin().subscribe(
            {
              next: (data) => {
                this.accounts=[]
                this.accounts=data
                console.log(data)
                this.searchId=undefined
              },
              error: (err) => {
                
                console.log(err)
              },
              complete: () => {
                console.log("Server completed sending data.");
              }
            }
          )
          console.log(data)
        },
        error: (err) => {
          alert("Admin add Error:"+err.error)
        },
        complete: () => {
          console.log("Server completed sending data.");
        }
      }
    )
    this.addStatus=false
    }
  }
  deleteAdmin(details:Admin){
    if (confirm("Do you want to Delete Account.Once you deleted you can't get back"))
    if(details.adminId!=undefined)
    this.adminService.deleteAdmin(details.adminId).subscribe(
      {
        next: (data) => {
          this.addAdminError=''
          this.addAdminSuccess=''
          this.searchError=''
          this.deleteAdminError=''
          this.openToast()
          this.adminService.searchAdmin().subscribe(
            {
              next: (data) => {
                this.accounts=[]
                this.accounts=data
                console.log(data)
                this.searchId=undefined
              },
              error: (err) => {
                console.log(err)
              },
              complete: () => {
                console.log("Server completed sending data.");
              }
            }
          )
          console.log(data)
        },
        error: (err) => {
          alert("Admin delete Error:"+err.error)
        },
        complete: () => {
          console.log("Server completed sending data.");
        }
      }
    )
  }
  searchAdmin(){
    if(this.searchString==undefined){
      this.adminService.searchAdmin().subscribe(
        {
          next: (data) => {
            this.accounts=[]
            this.accounts=data
            console.log(data)
            this.searchId=undefined
            this.searchError=''
          this.addAdminSuccess=''
          this.addAdminError=''
          this.deleteAdminError=''
          this.deleteAdminSuccess=''
            
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
    else if(typeof this.searchString==='string'&&this.emailStatus==true ){
      this.adminService.searchByEmail(this.searchString).subscribe(
        {
          next: (data) => {
            this.accounts=[]
            this.accounts.push(data)
            this.searchString=undefined
            this.searchError=''
            this.addAdminSuccess=''
            this.addAdminError=''
            this.deleteAdminError=''
            this.deleteAdminSuccess=''
          },
          error: (err) => {
            this.addAdminSuccess=''
            this.addAdminError=''
            this.deleteAdminSuccess=''
            this.deleteAdminError=''
            this.searchError="No Admin Found"
            console.log(err)
          },
          complete: () => {
            console.log("Server completed sending data.");
          }
        }
      )
    }
    else if(this.nameStatus==true&&typeof this.searchString==='string'){
      this.adminService.searchAdmin().subscribe(
        {
          next: (data) => {
            this.accounts=[]
              this.adminDup=data
            for(let i=0;i<this.adminDup.length;i++){
              if(this.adminDup[i].adminName==this.searchString)
              {
                this.accounts.push(this.adminDup[i])
              }
            }
          this.searchString==undefined
            this.searchId=undefined
            this.searchError=''
          this.addAdminSuccess=''
          this.addAdminError=''
          this.deleteAdminError=''
          this.deleteAdminSuccess=''
            
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
      else if(typeof this.searchString==='number'){
      this.adminService.searchById(this.searchString).subscribe(
        {
          next: (data) => {
            this.accounts=[]
            this.accounts.push(data)
            console.log(data)
            this.searchId=undefined
            this.searchError=''
            this.addAdminSuccess=''
            this.addAdminError=''
            this.deleteAdminError=''
            this.deleteAdminSuccess=''
          },
          error: (err) => {
            this.addAdminSuccess=''
            this.addAdminError=''
            this.deleteAdminSuccess=''
            this.deleteAdminError=''
            this.searchError="No Admin Found"
            console.log(err)
          },
          complete: () => {
            console.log("Server completed sending data.");
          }
        }
      )
      }
      
  }

}
