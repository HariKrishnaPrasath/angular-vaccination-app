import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Admin } from '../../../model/admin/admin';
import { AdminService } from '../../../service/admin/admin.service';
import { PatientService } from '../../../service/patient/patient.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive,CanvasJSAngularChartsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})

export class AdminDashboardComponent {
  
  superAdmin:number=0
  admin:number=0
  login:number=0
  accounts:Admin[]=[]
  chartOptions = {
	  animationEnabled: true,
	  title:{
		text: "Centers in India"
	  },
	  data: [{
		type: "doughnut",
		yValueFormatString: "#,###",
		indexLabel: "{name}",
		dataPoints: [
		  { y: 28, name: "Tamilnadu" },
		  { y: 10, name: "Maharastra" },
		  { y: 20, name: "Andhra Pradesh" },
		  { y: 15, name: "Kerala" },
		  { y: 23, name: "Karanataka" },
		  { y: 17, name: "Delhi" },
		  { y: 12, name: "Gujarat" }
		]
	  }]
	}	
  chartOptions2 = {
		animationEnabled: true,  
		title:{
			text: "Monthly Wise Vaccination status"
		},
		axisX: {
			title: "Months"
		},
		axisY: { 
			title: "Vaccine Count"                   
		},
		toolTip: {
			shared: true
		},
		legend: {
			cursor:"pointer",
			itemclick: function(e: any) {
			  if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
				  e.dataSeries.visible = false;
			  } else {
				  e.dataSeries.visible = true;
			  }
			  e.chart.render();
			}
		},
		data: [{        
			type: "spline",
			showInLegend: true,
			name: "CoviShield",
			dataPoints: [
			  { label: "Jan", y: 392 },     
			  { label: "Feb", y: 331 },     
			  { label: "Mar", y: 385 },     
			  { label: "Apr", y: 360 },     
			  { label: "May", y: 324 },     
			  { label: "Jun", y: 322 },     
			  { label: "Jul", y: 306 },     
			  { label: "Aug", y: 337 },     
			  { label: "Sep", y: 347 },     
			  { label: "Oct", y: 379 },     
			  { label: "Nov", y: 398 },     
			  { label: "Dec", y: 373 }
			]
		}, {        
			type: "spline",
			showInLegend: true,
			name: "Covaxin",
			dataPoints: [
			  { label: "Jan", y: 298 },     
			  { label: "Feb", y: 311 },     
			  { label: "Mar", y: 24 },     
			  { label: "Apr", y: 630 },     
			  { label: "May", y: 240 },     
			  { label: "Jun", y: 800 },     
			  { label: "Jul", y: 300 },     
			  { label: "Aug", y: 140 },     
			  { label: "Sep", y: 260 },     
			  { label: "Oct", y: 360 },     
			  { label: "Nov", y: 113 },     
			  { label: "Dec", y: 179 }
			]
		}]
	}
  constructor(private adminService:AdminService,private patientService:PatientService){
    this.patientService.getAllPatients().subscribe(
      {
        next:(data)=>{
          this.login=6
        },
        error:(err)=>{
          console.log(err)
        }
      }
    )
    this.adminService.searchAdmin().subscribe(
      {
        next: (data) => {
          this.accounts=[]
          this.accounts=data
          for (let i = 0; i < this.accounts.length; i++) {
            if(this.accounts[i].adminType=="SUPER"){
              this.superAdmin+=1
            }
            else if(this.accounts[i].adminType=="ADMIN"){
              this.admin+=1
            }
          }
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
}
export function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
  const monthly=["Jan","Feb","Mar","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  
  const clockElement = document.getElementById('clock');
  if (clockElement) {
    clockElement.innerHTML = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
}

setInterval(updateClock, 1000);