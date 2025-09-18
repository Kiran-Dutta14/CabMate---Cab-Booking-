import { Vehicle } from './vehicle.model';
import { RideBooking } from './ride-booking.model';

export interface Driver {
  id?: number;            // Optional because it will be auto-generated
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
  password: string;
  vehicle?: Vehicle;       // One-to-One relation
  rides?: RideBooking[];   // One-to-Many relation
}