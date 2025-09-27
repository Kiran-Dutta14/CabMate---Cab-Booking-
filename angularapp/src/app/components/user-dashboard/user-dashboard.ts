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

  pickup:string = '';
  dropoff:string = '';
  pickupTime:string = 'Pickup now';
  riderType:string = 'For me';

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
    setTimeout(() => {
      this.loadMap()
      this.initAutocomplete();
    }, 0);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/signin']);
  }

  // ✅ FIX: Search should not save ride into DB
  searchRide() {
    if (!this.pickup || !this.dropoff) {
      alert('Please enter both pickup and dropoff locations.');
      return;
    }

    // Just simulate search — do not call backend here
    console.log(`Searching ride from ${this.pickup} to ${this.dropoff}`);
    alert(`Searching ride from ${this.pickup} to ${this.dropoff}`);

     // ✅ Redirect to ride details/estimation page (optional)
    this.router.navigate(['/ride'], {
      queryParams: {
        pickup: this.pickup,
        dropoff: this.dropoff,
        pickupTime: this.pickupTime,
        riderType: this.riderType
      }
    });
  }


  private loadMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement || typeof google === 'undefined') return;

    const map = new google.maps.Map(mapElement, {
      center: { lat: 12.9716, lng: 77.5946 }, // Default center (Bangalore)
      zoom: 12
    });

    new google.maps.Marker({
      position: { lat: 12.9716, lng: 77.5946 },
      map,
      title: 'Pickup Location'
    });
  }

   private initAutocomplete() {
    const pickupInput = document.getElementById('pickupInput') as HTMLInputElement;
    const dropoffInput = document.getElementById('dropoffInput') as HTMLInputElement;

    if (!pickupInput || !dropoffInput || !google || !google.maps.places) {
      console.warn('Google Places API not loaded');
      return;
    }

    const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput);
    const dropoffAutocomplete = new google.maps.places.Autocomplete(dropoffInput);

    pickupAutocomplete.addListener('place_changed', () => {
      const place = pickupAutocomplete.getPlace();
      if (place && place.formatted_address) {
        this.pickup = place.formatted_address;
      }
    });

    dropoffAutocomplete.addListener('place_changed', () => {
      const place = dropoffAutocomplete.getPlace();
      if (place && place.formatted_address) {
        this.dropoff = place.formatted_address;
      }
    });
  }
}
