import { RideBooking } from './ride-booking.model';

export interface User {
  id?: number;               // Optional since it's auto-generated
  name: string;
  phone: string;
  email: string;
  password: string;
  rides?: RideBooking[];     // One-to-Many relation with RideBooking
}