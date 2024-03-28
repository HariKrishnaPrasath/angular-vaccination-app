import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ROUTER_INITIALIZER, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterLink,CanvasJSAngularChartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
	severity:string=""
	phone:number=0
	description:string=""
	reportStatus:boolean=false
  email: string = "";
	isDisabled1: boolean=false;
	isDisabled2: boolean=false;
	isDisabled3: boolean=false;
  setSeverity(severity: string,num:number) {
    this.severity = severity;
	if(num==1){
		this.isDisabled2 = true;
		this.isDisabled3 = true;
	}
	else if(num==2){
		this.isDisabled1 = true;
		this.isDisabled3 = true;
	}
	else if(num==3){
		this.isDisabled1 = true;
		this.isDisabled2 = true;
	}
  }
  submit(){
	this.isDisabled1 = false;
	this.isDisabled2 = false;
	this.isDisabled3 = false;
	console.log(this.severity)
	console.log(this.phone)
	console.log(this.description)
  }
  constructor(private router:Router, private route: ActivatedRoute) {
  }
  logout() : void {
    this.router.navigateByUrl('');
  }
  bookvacc():void{
	let parentUrl = this.route.parent?.snapshot.url.join('/')

	this.router.navigateByUrl(parentUrl+'/appointment')
  }
  bookAppointment() {
    let parentUrl = this.route.parent?.snapshot.url.join('/')

    this.router.navigateByUrl(parentUrl + '/center');
  }
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
 
}
