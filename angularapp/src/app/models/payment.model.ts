
import { RideBooking } from './ride-booking.model';

export interface Payment {
  id?: number;             // Optional since it's auto-generated
  paymentMethod: string;   // UPI, Card, Cash
  amount: number;
  status: string;          // SUCCESS, FAILED, PENDING
  ride?: RideBooking;      // One-to-One relation with RideBooking
}