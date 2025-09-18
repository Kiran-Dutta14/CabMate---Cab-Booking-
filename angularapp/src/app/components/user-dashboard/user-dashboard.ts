import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

declare var google: any; // For Google Maps

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboard implements OnInit, AfterViewInit {
  user: any = { name: '', email: '' };
  firstName: string = '';
  dropdownOpen: boolean = false;

  // ✅ Fix: Add missing properties from HTML
  pickup: string = '';
  dropoff: string = '';
  pickupTime: string = 'Pickup now';
  riderType: string = 'For me';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.firstName = this.user.name.split(' ')[0]; // Show only first name
    } else {
      this.router.navigate(['/signin']);
    }
  }

  ngAfterViewInit(): void {
    this.loadMap();
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
    alert(`Ride requested from ${this.pickup} to ${this.dropoff}`);
  }

  private loadMap() {
    const mapElement = document.getElementById('map');
    if (mapElement && google) {
      const map = new google.maps.Map(mapElement, {
        center: { lat: 28.6139, lng: 77.2090 }, // Default Delhi
        zoom: 12
      });

      new google.maps.Marker({
        position: { lat: 28.6139, lng: 77.2090 },
        map,
        title: 'Pickup Location'
      });
    }
  }
}
