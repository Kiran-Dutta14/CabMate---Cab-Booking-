import { Component } from '@angular/core';
import { UserService } from '../../services/user';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-login.html',
  styleUrls: ['./user-login.css']
})
export class UserLogin {
  user: User & { confirmPassword?: string } = {
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  showPassword: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onRegister() {
    if (this.user.password !== this.user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const { confirmPassword, ...payload } = this.user;

    this.userService.create(payload).subscribe({
      next: (res) => {
        alert("User registered successfully!");
        this.router.navigate(['/signin']);
      },
      error: (err) => {
        alert("Error registering user: " + err.message);
      }
    });
  }
}
