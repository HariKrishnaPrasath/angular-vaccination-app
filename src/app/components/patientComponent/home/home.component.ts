import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ROUTER_INITIALIZER, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  email?: string = "";
  constructor(private router:Router, private activatedRouter: ActivatedRoute) {
    this.email = this.activatedRouter.snapshot.paramMap.get('email')!;
    this.router.navigateByUrl('user/'+ this.email + '/profile');
  }
  logout() : void {
    this.router.navigateByUrl('');
  }

}
