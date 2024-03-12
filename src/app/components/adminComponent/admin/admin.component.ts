import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  email: string = '';
  constructor(private router: Router, private activatedRouter: ActivatedRoute) {
    this.email = this.activatedRouter.snapshot.paramMap.get('email')!;
    this.router.navigateByUrl('admin/' + this.email + '/manageAppointments');
  }
  logout(): void {
    this.router.navigateByUrl('');
  }
}
