import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from '../models/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private baseUrl = 'http://localhost:8080/api/drivers';  // Backend API URL

  constructor(private http: HttpClient) {}

  // ✅ Get all drivers
  getAll(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.baseUrl);
  }

  // ✅ Get driver by ID
  getById(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.baseUrl}/${id}`);
  }

  // ✅ Register a new driver
  create(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.baseUrl, driver);
  }

  // ✅ Update driver
  update(id: number, driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(`${this.baseUrl}/${id}`, driver);
  }

  // ✅ Delete driver
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ✅ Login driver (backend expects { identifier, password })
  login(identifier: string, password: string): Observable<Driver> {
    return this.http.post<Driver>(`${this.baseUrl}/login`, {
      identifier: identifier,
      password: password
    });
  }

  // Get total count of drivers (for admin dashboard metrics)
  getCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  // Get drivers filtered by status ("Active" / "Suspended")
  getByStatus(status: string): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.baseUrl}/status/${status}`);
  }
}
