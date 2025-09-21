import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { RideBookingService } from '../../../services/ride-booking';
import { RideBooking } from '../../../models/ride-booking.model';
import { FareService } from '../../../services/fare';
import { Fare } from '../../../models/fare.model';

@Component({
  selector: 'app-fare-management',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './fare-management.html',
  styleUrls: ['./fare-management.css']
})
export class FareManagement implements OnInit{
  activeTab: string = 'fare-rules';

  fareRules: Fare[] = [];
  rides: RideBooking[] = [];

  
  // ✅ Modal state
  showAddFareRuleModal = false;
  newFareRule: Fare = {
    ruleName: '',
    vehicleType: '',
    baseFare: 0,
    perKm: 0,
    perMinute: 0,
    minFare: 0,
    status: 'Active'
  };

  constructor(
    private ridebookingService: RideBookingService,
    private fareService: FareService
  ) {}

  ngOnInit(): void {
    this.loadRides();
    this.loadFareRules();
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

  // ✅ Load fare rules from backend
  loadFareRules(): void {
    this.fareService.getAll().subscribe(
      (data: Fare[]) => {
        console.log('Fetched fare rules:', data);
        this.fareRules = data;
      },
      (error: any) => {
        console.error('Error fetching fare rules:', error);
      }
    );
  }

  // ✅ Modal controls
  openAddFareRuleModal(): void {
    this.showAddFareRuleModal = true;
  }

  closeAddFareRuleModal(): void {
    this.showAddFareRuleModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.newFareRule = {
      ruleName: '',
      vehicleType: '',
      baseFare: 0,
      perKm: 0,
      perMinute: 0,
      minFare: 0,
      status: 'Active'
    };
  }

  // ✅ Add new fare rule
  addFareRule(): void {
    this.fareService.create(this.newFareRule).subscribe(
      () => {
        this.loadFareRules();   // refresh after save
        this.closeAddFareRuleModal();
      },
      (error: any) => {
        console.error('Error adding fare rule:', error);
      }
    );
  }
}
