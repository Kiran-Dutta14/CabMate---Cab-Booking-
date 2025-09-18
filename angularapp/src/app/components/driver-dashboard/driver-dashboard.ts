import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var google: any;

@Component({
  selector: 'app-driver-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver-dashboard.html',
  styleUrls: ['./driver-dashboard.css']
})
export class DriverDashboard implements AfterViewInit {
  today = new Date();
  online = false;
  rideRequestVisible = false;

  driver = {
    name: 'John Driver',
    initials: 'JD',
    car: 'Toyota Camry',
    plate: 'ABC123',
    rating: 4.92
  };

  stats = {
    earnings: 127.50,
    completedRides: 8
  };

  recentRides = [
    { date: 'Today, 10:45 AM', route: 'Downtown to Uptown', earnings: 15.75 },
    { date: 'Today, 9:30 AM', route: 'Airport to Business District', earnings: 28.50 },
    { date: 'Today, 8:15 AM', route: 'Suburbs to City Center', earnings: 22.30 },
    { date: 'Yesterday, 7:05 PM', route: 'Mall to Residential', earnings: 14.20 },
    { date: 'Yesterday, 5:40 PM', route: 'Office to Train Station', earnings: 9.85 },
  ];

  ngAfterViewInit() {
    this.initMap();
  }

  toggleOnline() {
    this.online = !this.online;
    if (this.online) {
      this.initMap();
    }
  }

  acceptRide() {
    alert('Ride accepted! Navigating to pickup location...');
    this.rideRequestVisible = false;
  }

  declineRide() {
    this.rideRequestVisible = false;
    setTimeout(() => this.rideRequestVisible = true, 5000);
  }

  private initMap() {
    const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // NYC

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: defaultLocation
    });

    // Driver marker
    new google.maps.Marker({
      position: defaultLocation,
      map,
      title: 'Your Location',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#14b8a6',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2
      }
    });

    // Show ride request after 3 sec
    setTimeout(() => {
      this.rideRequestVisible = true;

      const pickup = new google.maps.LatLng(defaultLocation.lat + 0.01, defaultLocation.lng + 0.01);
      const dropoff = new google.maps.LatLng(defaultLocation.lat + 0.02, defaultLocation.lng + 0.02);

      new google.maps.Marker({ position: pickup, map, title: 'Pickup' });
      new google.maps.Marker({ position: dropoff, map, title: 'Dropoff' });

      const route = new google.maps.Polyline({
        path: [pickup, dropoff],
        geodesic: true,
        strokeColor: '#14b8a6',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });

      route.setMap(map);
    }, 3000);
  }
}
