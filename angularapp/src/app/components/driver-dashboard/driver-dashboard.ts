import { Component, OnInit, AfterViewInit } from '@angular/core';
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
  recentRides: any[] = [];

  constructor(
    private router: Router,
    private rideBookingService: RideBookingService
  ) {}

  ngOnInit(): void {
    const storedDriver = localStorage.getItem('currentDriver');
    if (storedDriver) {
      this.driver = JSON.parse(storedDriver);

      // Driver initials for avatar
      this.driver.initials = this.driver.name
        ? this.driver.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
        : 'DR';

      // ✅ Fetch ride history for logged-in driver
      if (this.driver.id != null) {
        this.rideBookingService.getRidesByDriver(this.driver.id).subscribe({
          next: (rides: any[]) => {
            console.log("Fetched rides from backend:", rides);
            
            this.recentRides = rides.map((r: any) => ({
              date: r.rideTime ? new Date(r.rideTime).toLocaleString() : '—',
              route: `${r.pickupLocation ?? '—'} → ${r.dropoffLocation ?? '—'}`,
              earnings: r.fare ?? 0
            }));

            // ✅ Calculate stats
            this.stats.completedRides = this.recentRides.length;
            this.stats.earnings = this.recentRides.reduce(
              (sum, r) => sum + (r.earnings || 0),
              0
            );
          },
          error: (err) => {
            console.error('Error fetching rides:', err);
            this.recentRides = [];
          }
        });
      }
    } else {
      // If no driver found, redirect back to signin
      this.router.navigate(['/signin']);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.loadMap(), 0);
  }

  toggleOnline() {
    this.online = !this.online;
    // Example: notify backend about status
    // this.rideBookingService.setDriverStatus(this.driver.id, this.online).subscribe();
  }

  acceptRide() {
    this.rideRequestVisible = false;
    alert('Ride accepted!');
  }

  declineRide() {
    this.rideRequestVisible = false;
    alert('Ride declined!');
  }

  private loadMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    if (typeof google === 'undefined') {
      console.warn('Google Maps API not loaded.');
      return;
    }

    const map = new google.maps.Map(mapElement, {
      center: { lat: 28.6139, lng: 77.2090 }, // Default center (Delhi)
      zoom: 12
    });

    new google.maps.Marker({
      position: { lat: 28.6139, lng: 77.2090 },
      map,
      title: 'Driver Location'
    });
  }
}
