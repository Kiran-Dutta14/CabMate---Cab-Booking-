import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // if you want search ngModel later
import { UserService } from '../../../services/user'; // adjust path
import { User } from '../../../models/user.model'; // adjust path
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.css']
})
export class UserManagement implements OnInit {
  users: User[] = [];
  searchTerm: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe(
      (data: User[]) => {
        console.log('Fetched users:', data);
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Optional local client-side search (wire input to [(ngModel)]="searchTerm")
  filteredUsers(): User[] {
    if (!this.searchTerm) return this.users;
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(u =>
      (u.name?.toLowerCase().includes(term) || u.email?.toLowerCase().includes(term))
    );
  }
}
