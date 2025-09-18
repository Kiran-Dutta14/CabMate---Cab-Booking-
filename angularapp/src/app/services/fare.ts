// fare.service.ts

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

   getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  updateFare(id: number, fare: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, fare);
  }
}
