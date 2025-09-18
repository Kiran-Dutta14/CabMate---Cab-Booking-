import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './signin.html',
  styleUrls: ['./signin.css']
})
export class Signin {
  signin = { phone: '', password: '' };
  showSigninPassword: boolean = false; // ✅ Fix: add this property

  constructor(private userService: UserService, private router: Router) {}

  togglePassword() {
    this.showSigninPassword = !this.showSigninPassword;
  }

  onSignin() {
    this.userService.login(this.signin.phone, this.signin.password).subscribe({
      next: (user) => {
        // Save logged in user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Redirect to dashboard
        this.router.navigate(['/user-dashboard']);
      },
      error: () => {
        alert("Invalid phone number or password. Try again.");
      }
    });
  }
}
