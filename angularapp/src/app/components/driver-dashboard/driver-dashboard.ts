import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RideBookingService } from '../../services/ride-booking';
import { Driver } from '../../models/driver.model';
import { RideBooking } from '../../models/ride-booking.model';

declare const google: any;

@Component({
  selector: 'app-driver-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver-dashboard.html',
  styleUrls: ['./driver-dashboard.css']
})
export class DriverDashboard implements OnInit, AfterViewInit {
  driver: Driver | any = {
    id: null,
    name: '',
    licenseNumber: '',
    rating: 0,
    initials: ''
  };

  stats = { earnings: 0, completedRides: 0 };

  today: Date = new Date();
  online: boolean = false;
  rideRequestVisible: boolean = false;

  // right panel list
  recentRides: Array<{
    id: number;
    date: string;                 // localized string for UI
    pickupLocation: string;
    dropoffLocation: string;
    fare: number;
    status: string;
    rideTimeRaw?: string | null;  // keep raw for date filtering
  }> = [];

  selectedRide: RideBooking | null = null;

  constructor(
    private router: Router,
    private rideBookingService: RideBookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const storedDriver = localStorage.getItem('currentDriver');
    if (!storedDriver) {
       this.router.navigate(['/signin']);
      return;
    }

    this.driver = JSON.parse(storedDriver);

    // Driver initials for avatar
    this.driver.initials = this.driver.name
      ? this.driver.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
      : 'DR';

    // ✅ Fetch ride history for logged-in driver
    if (this.driver.id != null) {
      this.fetchDriverRides();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.loadMap(), 0);
  }

  /** Pull rides for this driver and compute today's totals */
  private fetchDriverRides(): void {
    this.rideBookingService.getRidesByDriver(this.driver.id).subscribe({
      next: (rides: any[]) => {
        this.recentRides = rides.map((r: any) => ({
          id: r.id,
          date: r.rideTime ? new Date(r.rideTime).toLocaleString() : '—',
          pickupLocation: r.pickupLocation ?? '—',
          dropoffLocation: r.dropoffLocation ?? '—',
          fare: Number(r.fare ?? 0),
          status: r.status ?? '—',
          rideTimeRaw: r.rideTime ?? null
        }));

        // ✅ Quick fix: show totals for ALL rides
        this.stats.completedRides = this.recentRides.length;
        this.stats.earnings = this.recentRides.reduce((sum, r) => sum + (r.fare || 0), 0);

        // check for any pending (BOOKED/PENDING) to show request popup
        const pending = rides.find((r: any) => r.status === 'PENDING' || r.status === 'BOOKED');
        this.selectedRide = pending ?? null;
        this.rideRequestVisible = !!this.selectedRide;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching rides:', err);
        this.recentRides = [];
        this.stats = { earnings: 0, completedRides: 0 };
      }
    });
  }
    

  toggleOnline(): void {
    this.online = !this.online;

    if (this.online) {
      this.rideBookingService.getPendingRides().subscribe({
        next: (rides) => {
          // pick the first pending ride; adjust strategy as needed
          this.selectedRide = rides[0] ?? null;
          this.rideRequestVisible = !!this.selectedRide;
        },
        error: (e) => console.error('Error fetching pending rides:', e)
      });
    } else {
      this.rideRequestVisible = false;
    }
  }  


  // 🔥 NEW: driver accepts ride
  acceptRide(rideId: number): void {
    if (!this.driver.id) return;
    this.rideBookingService.acceptRide(rideId, this.driver.id).subscribe({
      next: (updatedRide) => {
        alert('✅ Ride accepted! Navigating to pickup...');
        this.selectedRide = updatedRide;
        this.selectedRide.status = 'CONFIRMED';

        this.rideRequestVisible = true;
      },
      error: (err) => console.error('❌ Error accepting ride:', err)
    });
  }

  // 🔥 NEW: driver declines ride
  declineRide(rideId: number): void {
    this.rideBookingService.cancelRide(rideId).subscribe({
      next: () => {
        alert('❌ Ride declined.');
        this.rideRequestVisible = false;
        this.fetchDriverRides();
      },
      error: (err) => console.error('❌ Error declining ride:', err)
    });
  }

  // ✅ Mark ride as completed and update driver earnings
completeRide(rideId: number) {
  this.rideBookingService.completeRide(rideId).subscribe({
     next: (updatedRide) => {
      alert('✅ Ride completed successfully!');
      this.selectedRide = updatedRide;
      this.rideRequestVisible = false;

      // ✅ Refresh stats
      this.stats.completedRides += 1;
      this.stats.earnings += updatedRide.fare || 0;
    },
    error: (err) => {
      console.error('❌ Error completing ride:', err);
      alert('Failed to complete ride.');
    }
  });
}


  private loadMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    if (typeof google === 'undefined') {
      console.warn('Google Maps API not loaded.');
      return;
    }

    const map = new google.maps.Map(mapElement, {
      center: { lat: 12.9716, lng: 77.5946 }, // Default center (Bangalore)
      zoom: 12
    });

    new google.maps.Marker({
      position: { lat: 12.9716, lng: 77.5946 },
      map,
      title: 'Driver Location'
    });
  }
}
