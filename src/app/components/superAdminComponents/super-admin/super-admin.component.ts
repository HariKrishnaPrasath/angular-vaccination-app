import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-super-admin',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RouterOutlet],
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent {
  email: string = '';
  constructor(private router: Router, private activatedRouter: ActivatedRoute) {
    this.email = this.activatedRouter.snapshot.paramMap.get('email')!;
    this.router.navigateByUrl('superAdmin/' + this.email + '/adminDashboard');
  }
  logout(): void {
    this.router.navigateByUrl('');
  }
} 
