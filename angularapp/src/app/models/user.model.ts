import { RideBooking } from './ride-booking.model';

export interface User {
  id?: number;               // Optional since it's auto-generated
  name: string;
  phone: string;
  email: string;
  password: string;
  rides?: RideBooking[];     // One-to-Many relation with RideBooking

  // ✅ Newly added fields for User Management page
  joined?: string;           // Date user registered
  lastActive?: string;       // Last active timestamp
  status?: string;           // Optional: Active / Inactive
}
