import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  // ✅ Get all users
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  // ✅ Get user by ID
  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // ✅ Create/Register new user
  create(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  // ✅ Update user
  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  // ✅ Delete user
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ✅ Login user (backend expects phone + password)
  login(phone: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, { phone, password });
  }
}
