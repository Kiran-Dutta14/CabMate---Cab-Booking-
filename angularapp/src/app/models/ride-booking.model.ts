import { User } from './user.model';
import { Driver } from './driver.model';

export interface RideBooking {
  id?: number;               // Optional since it's auto-generated
  pickupLocation: string;
  dropLocation: string;
  rideTime: string;          // Use string to represent LocalDateTime
  fare: number;
  status: string;            // BOOKED, ONGOING, COMPLETED, CANCELLED

  user?: User;               // Many-to-One relation with User
  driver?: Driver;           // Many-to-One relation with Driver
}