
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CenterService } from '../../../service/center/center.service';
import { Center } from '../../../model/center/center';
import { AdminService } from '../../../service/admin/admin.service';
import { Admin } from '../../../model/admin/admin';
import { compileNgModule } from '@angular/compiler';


@Component({
  selector: 'app-manage-center',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './manage-center.component.html',
  styleUrl: './manage-center.component.css'
})


export class ManageCenterComponent implements OnInit {
updateCenter() {
throw new Error('Method not implemented.');
}
clear() {
throw new Error('Method not implemented.');
}
  email: string= "";
  center:Center=new Center();
  message:string="";
  errorMessage:string="";
  details:Admin=new Admin();

  constructor(private adminService:AdminService,private centerService:CenterService,private activatedRoute: ActivatedRoute){
    this.email = this.activatedRoute.snapshot.paramMap.get('email')!;
    console.log(this.email);
  };

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    var obj=sessionStorage.getItem("Admin");
    var data;
    if(obj!=null){
      data=JSON.parse(obj);
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
  
    );
  }

}
