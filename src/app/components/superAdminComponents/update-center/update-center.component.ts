import { Component, OnInit } from '@angular/core';
import { CenterService } from '../../../service/center/center.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Center } from '../../../model/center/center';
import { Search } from '../../../pipes/search';
import { Admin } from '../../../model/admin/admin';
import { AdminService } from '../../../service/admin/admin.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-center',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, Search],
  templateUrl: './update-center.component.html',
  styleUrl: './update-center.component.css'
})
export class UpdateCenterComponent implements OnInit {
  id: number;
  center: Center = new Center();
  message: string = "";
  errorMessage: string = "";
  selectedAdmin?: Admin;
  adminList?: Admin[] = [];
  selectAdmin?: Admin;

  constructor(
    private centerService: CenterService,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private location: Location,
    private _snackBar: MatSnackBar
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    console.log(this.id);
    this.centerService.getCenterById(this.id).subscribe(
      {
        next: (data) => {
          if (!data.admin || data.admin.adminId == null) {
            // Ensure admin object exists
            if (!data.admin) {
              data.admin = {}; // Initialize admin if it doesn't exist
            }
            data.admin.adminId = 0; // Assign adminId as 0
          }
          this.center = { ...data };
          console.log(this.center.admin);

        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.message;
        }
      }
    );
  }

  ngOnInit(): void {
    this.adminService.getAllAdmin().subscribe(
      {
        next: (res) => {
          console.log(res);
          this.adminList = res;
          this.selectAdmin = this.adminList![0];
        }
      }
    );

  }
  openToast() {
    this._snackBar.open('Center updated successfully!', 'Close', {
      duration: 7000 // 7 seconds
    });
  }
  updateCenter() {
    console.log(this.center);

    this.centerService.updateCenterByCenter(this.center).subscribe({
      next: (data) => {
        console.log(data);
        this.center = data;
        this.openToast()
        this.message = "center details succesfully updated";
        //this.validation=false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = "Cannot Update center Details";
      }

    });
  }
  clear() {
    this.location.back();
  }
}

