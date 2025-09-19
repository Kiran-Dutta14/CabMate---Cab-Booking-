import { Component } from '@angular/core';
import { DriverService } from '../../services/driver';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './driver-login.html',
  styleUrls: ['./driver-login.css']
})
export class DriverLogin {
  driver: any = {
    name: '',
    phone: '',
    email: '',
    licenseNumber: '',
    password: '',
    confirmPassword: ''
  };

  showPassword: boolean = false;

  constructor(private driverService: DriverService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // ✅ Register new driver
  onRegister() {
    if (this.driver.password !== this.driver.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

     this.driverService.create(this.driver).subscribe({
      next: () => {
        alert('Driver registered successfully!');
        this.router.navigate(['/signin']);  // ✅ go to signin
      },
      error: (err) => {
        alert('Error registering driver: ' + err.message);
      }
    });
  }
}
