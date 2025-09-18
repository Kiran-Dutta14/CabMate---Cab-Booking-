import { Component } from '@angular/core';
import { DriverService } from '../../services/driver';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-driver-login',
  standalone: true, // make it standalone
  imports: [FormsModule, CommonModule], // import FormsModule here
  templateUrl: './driver-login.html',
  styleUrls: ['./driver-login.css']
})
export class DriverLogin {
  driver: any = { name: '', phone: '', email: '', licenseNumber: '', vehicle: '', password: '', confirmPassword: '' };
  showPassword: boolean = false;

  constructor(private driverService: DriverService) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onRegister() {
    if (this.driver.password !== this.driver.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    this.driverService.create(this.driver).subscribe(res => {
      alert("Driver registered successfully!");
    });
  }
}
