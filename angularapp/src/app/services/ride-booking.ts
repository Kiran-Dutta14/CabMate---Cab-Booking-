import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RideBooking } from '../models/ride-booking.model';

@Injectable({
  providedIn: 'root'
})
export class RideBookingService {
  private baseUrl = 'http://localhost:8080/api/rides';

  constructor(private http: HttpClient) {}

  getAll(): Observable<RideBooking[]> {
    return this.http.get<RideBooking[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<RideBooking> {
    return this.http.get<RideBooking>(`${this.baseUrl}/${id}`);
  }

  create(ride: RideBooking): Observable<RideBooking> {
    return this.http.post<RideBooking>(`${this.baseUrl}`, ride);
  }

  update(id: number, ride: RideBooking): Observable<RideBooking> {
    return this.http.put<RideBooking>(`${this.baseUrl}/${id}`, ride);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
