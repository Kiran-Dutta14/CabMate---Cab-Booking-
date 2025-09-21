// vehicle.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private baseUrl = 'http://localhost:8080/api/vehicles';  // Backend API URL

  constructor(private http: HttpClient) { }

   // Get all vehicles
  getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl);
  }

    // Get vehicle by id
  getById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/${id}`);
  }

   // Create vehicle
  create(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.baseUrl}/register`, vehicle);
  }

  // Update vehicle
  update(id: number, vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.baseUrl}/${id}`, vehicle);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Optional: get vehicles by status (if backend supports it)
  getByStatus(status: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/status/${status}`);
  }

  // Optional: get count
  getCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}
