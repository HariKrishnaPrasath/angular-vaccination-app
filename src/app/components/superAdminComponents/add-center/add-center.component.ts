import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Center } from '../../../model/center/center';
import { CenterService } from '../../../service/center/center.service';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AdminService } from '../../../service/admin/admin.service';
import { Admin } from '../../../model/admin/admin';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
    selector: 'app-add-center',
    standalone: true,
    templateUrl: './add-center.component.html',
    styleUrl: './add-center.component.css',
    imports: [FormsModule, CommonModule, RouterModule]
})
export class AddCenterComponent implements OnInit {

  addFlag:Boolean=true;
  updateFlag:Boolean=false;
  deleteFlag:Boolean=false;
  allCenters:Boolean=false;

  newCenter: Center = new Center();
  message: string = '';
  errorMessage: string = '';
  selectedAdmin?: Admin;

  centerArray: Center[]=[];
  adminList: Admin[] = [];
  adminList2: Admin[] = [];
  
  constructor(
    private centerService: CenterService,
    private location: Location,
    private adminService: AdminService,private _snackBar: MatSnackBar
  ) {}
  openToast() {
    this._snackBar.open('Center Added Successfully!', 'Close', {
      duration: 7000 // 7 seconds
    });
  }
  ngOnInit(): void {
    this.adminService.getAllAdmin().subscribe(
      {
        next: (res) => {
          console.log(res);
          this.adminList2 = res;
          for(let i=0;i<this.adminList2.length;i++)
          {
            if(this.adminList2[i].email?.charAt(0)=='&')
            {
              this.adminList.push(this.adminList2[i])
            }
          }
        }
      }
    );
    this.centerService.getAllCenters().subscribe({
      next: (data) => {
        console.log(data);
        this.centerArray=data;
      }
    });
  }

  addCenter() {

    console.log(this.selectedAdmin);
    this.newCenter.admin = this.selectedAdmin;
    this.newCenter.slots = [];
    console.log(this.newCenter);
    this.centerService.addNewCenter(this.newCenter).subscribe({
      next: (data) => {
        console.log(data);
        this.message = 'Center added.';
        this.errorMessage = '';
        this.openToast()
      },
      error: (err) => {
        console.log(err);
        // this.errorMessage="Could't add Account";/
        if (err.status == '0')
          this.errorMessage = ' Network error, please try again later.';
        else this.errorMessage = err.error;
        this.message = '';
      },
    });
  }
  goBackToPrevPage(): void {
    //console.log('vanthuten');
    this.location.back();
  }

}
