export interface Fare {
  id?: number;           // Optional since it's auto-generated
  ruleName: string;      // Name of the fare rule (e.g., "Standard Sedan Rate")
  vehicleType: string;   // e.g., Sedan, SUV, Bike
  baseFare: number;      // Minimum base charge
  perKm: number;         // Price per KM
  perMinute: number;     // Price per minute
  minFare: number;       // Minimum total fare
  status: string;        // ACTIVE / INACTIVE
}
