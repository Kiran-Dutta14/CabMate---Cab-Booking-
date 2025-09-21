import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fare } from '../models/fare.model';

@Injectable({
  providedIn: 'root'
})
export class FareService {

  private baseUrl = 'http://localhost:8080/api/fares';  // Backend API URL

  constructor(private http: HttpClient) { }

  // ✅ Get all fares
  getAll(): Observable<Fare[]> {
    return this.http.get<Fare[]>(this.baseUrl);
  }

  // ✅ Get fare by ID
  getById(id: number): Observable<Fare> {
    return this.http.get<Fare>(`${this.baseUrl}/${id}`);
  }

  // ✅ Get fare by vehicle type
  getByVehicleType(vehicleType: string): Observable<Fare> {
    return this.http.get<Fare>(`${this.baseUrl}/vehicle/${vehicleType}`);
  }

  // ✅ Create a new fare rule
  create(rule: Fare): Observable<Fare> {
    return this.http.post<Fare>(this.baseUrl, rule);
  }

  // ✅ Update fare
  updateFare(id: number, fare: Fare): Observable<Fare> {
    return this.http.put<Fare>(`${this.baseUrl}/${id}`, fare);
  }

  // ✅ Delete fare
  deleteFare(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ✅ Get total fare count
  getCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  // ✅ Get fares by status (ACTIVE / INACTIVE)
  getByStatus(status: string): Observable<Fare[]> {
    return this.http.get<Fare[]>(`${this.baseUrl}/status/${status}`);
  }

  // ✅ Get count of fares by status
  getCountByStatus(status: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/${status}`);
  }
}
