import { Driver } from './driver.model';

export interface Vehicle {
  id?: number;         // Optional since it's auto-generated
  plateNumber: string;
  model: string;
  type: string;        // e.g., Car, Bike, Auto
  color: string;
  driver?: Driver;     // Many-to-One relation (each vehicle belongs to one driver)

  // ✅ Additional fields to support Vehicle Management UI & backend data
  name?: string;           // display name in UI (v.name in template)
  year?: number;           // manufacturing year (used in UI)
  license?: string;        // alias for plateNumber, since template uses v.license
  status?: string;         // Active / Maintenance / Inactive
  assignedDriver?: string; // assigned driver name or ID (UI column)
  added?: string;          // date when the vehicle was added
}
