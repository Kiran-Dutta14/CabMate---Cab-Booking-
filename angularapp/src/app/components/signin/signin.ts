import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';
import { DriverService } from '../../services/driver';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './signin.html',
  styleUrls: ['./signin.css']
})
export class Signin {
  signin = { emailOrPhone: '', password: '' };
  role: 'user' | 'driver' = 'user';   // ✅ default role = user
  showSigninPassword: boolean = false;

  constructor(
    private userService: UserService,
    private driverService: DriverService,
    private router: Router
  ) {}

  togglePassword() {
    this.showSigninPassword = !this.showSigninPassword;
  }

  onSignin() {
    if (this.role === 'user') {
      // User login
      this.userService.login(this.signin.emailOrPhone, this.signin.password).subscribe({
        next: (user) => {
          if(user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/user-dashboard']);
          } else{
            alert("User not found or wrong password.");
          }
        },
        error: () => {
          alert("Invalid user credentials.");
        }
      });
    } else if (this.role === 'driver') {
      // Driver login
      this.driverService.login(this.signin.emailOrPhone, this.signin.password).subscribe({
        next: (driver) => {
          if (driver) {
            localStorage.setItem('currentDriver', JSON.stringify(driver));
            this.router.navigate(['/driver-dashboard']);
          } else {
            alert("Driver not found or wrong password.");
          }
        },
        error: () => {
          alert("Invalid driver credentials.");
        }
      });
    }
  }
}
