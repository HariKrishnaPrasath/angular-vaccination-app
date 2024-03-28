import { Component } from '@angular/core';
import { CenterService } from '../../../service/center/center.service';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Center } from '../../../model/center/center';
import { Search } from '../../../pipes/search';


@Component({
  selector: 'app-all-centers',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,Search],
  templateUrl: './all-centers.component.html',
  styleUrl: './all-centers.component.css'
})
export class AllCentersComponent {
  email?: string;
  query: any;
  parentUrl: string;

  constructor(
    private centerService: CenterService,
    private router: Router,
    private routerSnap: ActivatedRoute,
    private route: ActivatedRoute
  ) {
    // this.email = this.routerSnap.snapshot.paramMap.get('email')!;
    this.parentUrl = this.route.parent?.snapshot.url.join('/')!;


  }

  message: string = '';
  errorMessage: string = '';
  centerArray:Center[]=[];

  ngOnInit(): void {
    this.centerService.getAllCenters().subscribe({
      next: (data) => {
        console.log(data);
        this.centerArray=data;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = "Could't Load Centers";
        this.message = "";
      },
      complete: () => {
        console.log("Server completed sending data.");
      }
    }); 
  }

  deleteCenter(id?: number) {
    console.log("delete id:" + id);
    if (confirm("Do you want to Delete Center id:" + id))
      this.centerService.deleteCenterById(id).subscribe(
        {
          next: (resp) => {
            console.log(resp);
            // delete account with id in local array
            this.centerArray = this.centerArray.filter((a) => a.centerId != id);
            this.message = "Deleted Account with id:" + id;
            this.errorMessage = "";
          },
          error: (err) => {
            console.log(err);
            this.message = "";
            this.errorMessage = "Could not Delete Center.";
          }
        }
      );
  }

  addCenter() {
    //this.router.navigateByUrl()
    // this.router.navigateByUrl('superAdmin/' + this.email + '/addCenter');
    this.router.navigateByUrl(this.parentUrl + '/addCenter');

  }

  updateCenter(center:Center) {

    // this.router.navigateByUrl('superAdmin/' + this.email + '/updateCenter/' + center.centerId );
    this.router.navigateByUrl(this.parentUrl + '/updateCenter/' + center.centerId);

  }
  name:string=""
  dup:Center[]=[]
  search(){
    for(let i of this.centerArray){
      if(i.centerName?.toLocaleLowerCase==this.name.toLocaleLowerCase||i.district?.toLocaleLowerCase==this.name.toLocaleLowerCase)
      {
        this.dup.push(i)
      }
    }
    this.centerArray=this.dup
  }
}
