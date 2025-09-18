export interface Fare {
  id?: number;           // Optional since it's auto-generated
  vehicleType: string;   // e.g., Sedan, SUV, Bike
  baseFare: number;      // Minimum charge
  perKm: number;         // Price per KM
  perMinute: number;     // Price per minute
  status: string;        // ACTIVE / INACTIVE
}
