// src/app/user/user-dashboard.ts
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RideBookingService } from '../../services/ride-booking';

declare const google: any;

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboard implements OnInit, AfterViewInit {
  user: any = { name: '', email: '' };
  firstName = '';
  dropdownOpen = false;

  pickup = '';
  dropoff = '';
  pickupTime = 'Pickup now';
  riderType = 'For me';

  constructor(private router: Router, private rideBookingService: RideBookingService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.firstName = (this.user.name || '').split(' ')[0] || '';
    } else {
      this.router.navigate(['/signin']);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.loadMap(), 0);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/signin']);
  }

  searchRide() {
    console.log(`Searching ride from ${this.pickup} to ${this.dropoff}`);
    // Call backend to search/create ride
    const payload = {
      userId: this.user.id,
      pickup: this.pickup,
      dropoff: this.dropoff,
      pickupTime: this.pickupTime,
      riderType: this.riderType
    };

    this.rideBookingService.requestRide(payload).subscribe({
      next: (res) => {
        alert('Ride requested successfully.');
        // optionally redirect to ride status page
      },
      error: (err) => {
        console.error('Error requesting ride', err);
        alert('Failed to request ride.');
      }
    });
  }

  private loadMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    if (typeof google === 'undefined') {
      console.warn('Google maps not loaded.');
      return;
    }

    const map = new google.maps.Map(mapElement, {
      center: { lat: 28.6139, lng: 77.2090 },
      zoom: 12
    });

    new google.maps.Marker({
      position: { lat: 28.6139, lng: 77.2090 },
      map,
      title: 'Pickup Location'
    });
  }
}
