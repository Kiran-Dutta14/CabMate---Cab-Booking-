import { User } from './user.model';
import { Driver } from './driver.model';

export interface RideBooking {
  id?: number;               // Optional since it's auto-generated
  pickupLocation: string;
  dropoffLocation: string;
  rideTime?: Date;          // Use string to represent LocalDateTime
  fare: number;
  status: string;            // BOOKED, ONGOING, COMPLETED, CANCELLED

  user?: User;               // Many-to-One relation with User
  driver?: Driver;           // Many-to-One relation with Driver

  // ✅ Extra fields for UI (Fare Management Ride History)
  customer?: string;         // maps from user.name
  contact?: string;          // maps from user.email or phone
  route?: string;            // pickupLocation → dropoffLocation
  distance?: string;         // optional if backend provides it
  payment?: string;          // e.g., Cash / Card / UPI
  date?: string;             // formatted rideTime
}