import { Driver } from './driver.model';

export interface Vehicle {
  id?: number;         // Optional since it's auto-generated
  plateNumber: string;
  model: string;
  type: string;        // e.g., Car, Bike, Auto
  color: string;
  driver?: Driver;     // Many-to-One relation (each vehicle belongs to one driver)
}