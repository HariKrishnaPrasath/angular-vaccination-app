import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,RouterLink],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
display() {
throw new Error('Method not implemented.');
}
  email?: string = "";
  constructor(private router:Router, private activatedRouter: ActivatedRoute) {
    this.email = this.activatedRouter.snapshot.paramMap.get('email')!;
    this.router.navigateByUrl('user/'+ this.email + '/home');
  }
  logout() : void {
    this.router.navigateByUrl('patient/login');
  }
}
