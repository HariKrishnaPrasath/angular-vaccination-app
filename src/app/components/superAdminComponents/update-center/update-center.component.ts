import { Component, OnInit } from '@angular/core';
import { CenterService } from '../../../service/center/center.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Center } from '../../../model/center/center';
import { Search } from '../../../pipes/search';
import { Admin } from '../../../model/admin/admin';
import { AdminService } from '../../../service/admin/admin.service';

@Component({
  selector: 'app-update-center',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,Search],
  templateUrl: './update-center.component.html',
  styleUrl: './update-center.component.css'
})
export class UpdateCenterComponent implements OnInit {
  id: number;
  center:Center=new Center();
  message:string="";
  errorMessage:string="";
  selectedAdmin?: Admin;
  adminList?:Admin[]=[];
  selectAdmin?: Admin;

  constructor(
    private centerService: CenterService,
    private activatedRoute: ActivatedRoute,
    private adminService : AdminService
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    console.log(this.id);
    this.centerService.getCenterById(this.id).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.center={...data};
          console.log(this.center.admin);
          

        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.message;
        }
      }
    );
  }

  ngOnInit(): void{
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

  updateCenter(){
    console.log(this.center);
    
    this.centerService.updateCenterByCenter(this.center).subscribe({
      next: (data) => {
        console.log(data);
        this.center = data;
        this.message= "center details succesfully updated";
        //this.validation=false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage="Cannot Update center Details";
      }

    });
  }
  clear(){
    let id = this.center.centerId;
    this.center={};
    this.center.centerId=id;
  }
}

