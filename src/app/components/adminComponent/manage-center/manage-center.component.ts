import { Component } from '@angular/core';
import { CenterService } from '../../../service/center/center.service';
import { Center } from '../../../model/center/center';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-manage-center',
  standalone: true,
  imports: [],
  templateUrl: './manage-center.component.html',
  styleUrl: './manage-center.component.css'
})
export class ManageCenterComponent {
  center: Center = new Center();
  constructor(public centerService: CenterService) {
    var obj = sessionStorage.getItem("Admin");
    var data;
    if (obj != null) {
      data = JSON.parse(obj)
      console.log(data);
    }
    this.centerService.getCenterByAdminId(data.adminId).subscribe(
      {
        next: (res) => {
          sessionStorage.setItem("Center",JSON.stringify(res))
          console.log(res);
          this.center = res;
        },
        error : (err) => {
          console.log(err);
          
        }
      }
    )
  }
}
