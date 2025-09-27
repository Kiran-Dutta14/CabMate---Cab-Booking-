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

  // ✅ Get all rides (for admin ride history)
  getAll(): Observable<RideBooking[]> {
    return this.http.get<RideBooking[]>(this.baseUrl);
  }

  // get rides for a driver
  getRidesByDriver(driverId: number): Observable<RideBooking[]> {
    return this.http.get<RideBooking[]>(`${this.baseUrl}/driver/${driverId}`);
  }

  // get rides for a user
  getRidesByUser(userId: number): Observable<RideBooking[]> {
    return this.http.get<RideBooking[]>(`${this.baseUrl}/user/${userId}`);
  }

  // create/request a ride
  requestRide(payload: any): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }

  // search available drivers (example)
  searchRides(query: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/search`, query);
  }

  // optionally set driver online/offline
  setDriverOnline(driverId: number, online: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}/drivers/${driverId}/online`, { online });
  }

  // 🔥 NEW: Get all pending rides
  getPendingRides(): Observable<RideBooking[]> {
    return this.http.get<RideBooking[]>(`${this.baseUrl}/pending`);
  }

  // 🔥 NEW: Driver accepts ride
  acceptRide(rideId: number, driverId: number): Observable<RideBooking> {
    return this.http.post<RideBooking>(`${this.baseUrl}/${rideId}/accept?driverId=${driverId}`, {});
  }

  // 🔥 NEW: Driver cancels ride
  cancelRide(rideId: number): Observable<RideBooking> {
    return this.http.post<RideBooking>(`${this.baseUrl}/${rideId}/cancel`, {});
  }

  // 🔥 NEW: Update ride status (generic)
  updateRideStatus(rideId: number, status: string): Observable<RideBooking> {
    return this.http.put<RideBooking>(`${this.baseUrl}/${rideId}/status?status=${status}`, {});
  }

  // ✅ Complete ride (mark as COMPLETED and update driver earnings)
  completeRide(rideId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${rideId}/complete`, {});
  }
  

}