import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaccineService } from '../../../service/vaccine/vaccine.service';
import { Vaccine } from '../../../model/vaccine/vaccine';
import { FormsModule } from '@angular/forms';
import { CenterService } from '../../../service/center/center.service';
import { Center } from '../../../model/center/center';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-vaccines',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-vaccines.component.html',
  styleUrl: './add-vaccines.component.css'

})

export class AddVaccinesComponent implements OnInit {
  center: Center = new Center();
  constructor(private _snackBar: MatSnackBar,
    private vaccineService: VaccineService,private location: Location, private centerService: CenterService
  ) {
    this.center = JSON.parse(sessionStorage.getItem('Center')!)
    // this.oldVaccineArray = this.center.vaccineMap!;
  }
  openToast() {
    this._snackBar.open('Vaccine add successfully!', 'Close', {
      duration: 7000 // 7 seconds
    });
  }

  ngOnInit(): void {
    this.loadVaccinesInCenter();
    this.loadAllVaccine();
  }

  loadVaccinesInCenter() {
    this.centerService.getAllVaccinesInCenter(this.center.centerId!).subscribe(
      {
        next: (res) => {
          console.log();
          this.oldVaccineArray = [...res];
        },
        error: (err)=>{
          if (err.error == "There is no any vaccines available in this center currently")
            this.oldVaccineArray = [];
        }
      }
    )
  }

  // vaccine: Vaccine = new Vaccine();
  vaccineArray: Vaccine[] = [];
  oldVaccineArray: Vaccine[] = [];

  loadAllVaccine() {
    this.vaccineService.getAllVaccine().subscribe(
      {
        next: (res) => {
          console.log(res);
          let vaccines = [...res];
          this.vaccineArray = vaccines.filter(vaccine1 => !this.oldVaccineArray.some(vaccine2 => vaccine1.vaccineId === vaccine2.vaccineId));

        },
        error: (err) => console.log(err)

      }
    )
  }
  addVaccineToCenter(vaccine: Vaccine) {
    this.centerService.addVaccineToCenter(this.center.centerId!, vaccine).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.vaccineArray = this.vaccineArray.filter((vac) => {
            return vac.vaccineId != vaccine.vaccineId;
          })
          this.openToast()
        },
        error: (err) => console.log(err)

      }
    )
  }
  goBackToPrevPage(): void {
    //console.log('vanthuten');
    this.location.back();
  }
}



