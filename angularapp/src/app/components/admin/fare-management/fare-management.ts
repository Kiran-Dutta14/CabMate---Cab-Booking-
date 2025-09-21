import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { RideBookingService } from '../../../services/ride-booking';
import { RideBooking } from '../../../models/ride-booking.model';


@Component({
  selector: 'app-fare-management',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './fare-management.html',
  styleUrls: ['./fare-management.css']
})
export class FareManagement{
  activeTab: string = 'fare-rules';

  fareRules: any[] = [
    { ruleName: 'Standard Sedan Rate', vehicleType: 'sedan', baseFare: 5.00, perKm: 2.50, perMinute: 0.50, minFare: 10.00, status: 'Active' },
    { ruleName: 'SUV Premium Rate', vehicleType: 'suv', baseFare: 7.50, perKm: 3.25, perMinute: 0.75, minFare: 15.00, status: 'Active' },
    { ruleName: 'Luxury Service Rate', vehicleType: 'luxury', baseFare: 12.00, perKm: 4.50, perMinute: 1.00, minFare: 25.00, status: 'Active' }
  ];

  rides: RideBooking[] = [];

  constructor(private ridebookingService: RideBookingService) {}

  ngOnInit(): void {
    this.loadRides();
  }

  loadRides(): void {
    this.ridebookingService.getAll().subscribe(
      (data: RideBooking[]) => {
        console.log('Fetched rides:', data);
        this.rides = data;
      },
      (error: any) => {
        console.error('Error fetching rides:', error);
      }
    );
  }
}
