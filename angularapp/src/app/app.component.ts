// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    Navbar,
    Footer
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  // check if current route is admin
  hideNavbar() {
  const hiddenRoutes = ['/admin/login', '/admin/dashboard', '/admin/drivers', '/admin/users', '/admin/vehicles', '/admin/fares', '/admin/support', '/user-dashboard', '/driver-dashboard', '/ride']; // add more here
  return hiddenRoutes.includes(this.router.url);
  }

   hideFooter() {
  const hiddenRoutes = ['/admin/login', '/admin/dashboard']; // add more here
  return hiddenRoutes.includes(this.router.url);
  }
}
