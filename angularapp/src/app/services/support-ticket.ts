
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupportTicket } from '../models/support-ticket.model';

@Injectable({
  providedIn: 'root'
})
export class SupportTicketService {

  private baseUrl = 'http://localhost:8080/api/tickets';  // Backend API URL

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  create(ticket: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, ticket);
  }

  closeTicket(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/close`, {});
  }
}
