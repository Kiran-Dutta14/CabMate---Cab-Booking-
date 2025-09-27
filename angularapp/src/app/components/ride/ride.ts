import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FareService } from '../../services/fare';
import { Fare } from '../../models/fare.model';
import { RideBookingService } from '../../services/ride-booking'; 
import { RideBooking } from '../../models/ride-booking.model';

declare const google: any;

@Component({
  selector: 'app-ride',
  standalone: true,   
  imports: [CommonModule, FormsModule],
  templateUrl: './ride.html',
  styleUrls: ['./ride.css']
})
export class Ride implements OnInit, AfterViewInit {
  pickup: string = '';
  dropoff: string = '';

  rideOptions: any[] = [
    {
      name: 'Go Non AC',
      people: 4,
      time: '2 mins away',
      eta: '10 mins',
      fare: 180.00,
      originalFare: 100.00,
      discount: '20% off',
      desc: 'Everyday affordable rides'
    },
    {
      name: 'Auto',
      people: 3,
      time: '1 min away',
      eta: '8 mins',
      fare: 150.00,
      originalFare: null,
      discount: null,
      desc: 'Quick & affordable'
    }
  ];

  selectedRide: any = null;   // ✅ store selected ride

  distanceKm: number = 0;
  durationMin: number = 0;
  etaText: string = '';

  showPaymentModal: boolean = false;  // ✅ for modal toggle
  
  showCashConfirmModal: boolean = false;   // cash confirm modal
  showGiftCardModal: boolean = false;      // for gift card
  showUpiModal: boolean = false;           // UPI modal

  selectedPayment: string | null = null;   // selected payment method

  giftCardCode: string = ''; // ✅ to hold gift card input
  upiAddress: string = ''; // ✅ for UPI input

  constructor(
    private route: ActivatedRoute, 
    private fareService: FareService,
    private rideBookingService: RideBookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // ✅ Get pickup & dropoff from query params (if provided)
    this.route.queryParams.subscribe(params => {
      if (params['pickup']) this.pickup = params['pickup'];
      if (params['dropoff']) this.dropoff = params['dropoff'];
    });
  }

  ngAfterViewInit(): void {
     this.loadGoogleMaps().then(() => {
      this.initMap();
    });
  }

  // ✅ Load Google Maps dynamically
  loadGoogleMaps(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof google !== 'undefined' && google.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA2RGqo1nnPzeHRV2o48fqrzbvuZ3vToOU&libraries=places';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

   initMap() {
    const mapElement = document.getElementById("map") as HTMLElement;
    if (!mapElement || typeof google === 'undefined') {
      console.error('❌ Google Maps not loaded yet');
      return;
    }

    const map = new google.maps.Map(mapElement, {
      center: { lat: 12.9716, lng: 77.5946 },
      zoom: 13
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    directionsService.route(
      {
        origin: this.pickup,
        destination: this.dropoff,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response: any, status: any) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);

          const route = response.routes[0].legs[0];
          this.distanceKm = route.distance.value / 1000;
          this.durationMin = Math.round(route.duration.value / 60);
          this.etaText = route.duration.text;

          this.fareService.getAll().subscribe({
            next: (fares: Fare[]) => {
              console.log('✅ Fares from backend:', fares);

              this.rideOptions = fares
                .filter(f => f.status?.toLowerCase() === 'active')
                .map(rule => ({
                  name: rule.ruleName,
                  people: rule.vehicleType === 'Auto' ? 3 : 4,
                  time: '2 mins away',
                  eta: this.etaText,
                  fare: this.fareService.calculateFare(this.distanceKm, this.durationMin, rule),
                  originalFare: null,
                  discount: null,
                  desc: `${rule.vehicleType} ride`
                }));

              console.log('✅ Ride options set:', this.rideOptions);
              this.cdr.detectChanges();
            },
            error: err => console.error('❌ Error fetching fares:', err)
          });
        } else {
          console.error('❌ Directions request failed:', status);
        }
      }
    );
  }

  // ✅ Select ride option
  selectRide(ride: any) {
    this.selectedRide = ride;
  }

  // ✅ Dynamic request button text
  get requestButtonText(): string {
    return this.selectedRide ? `Request ${this.selectedRide.name}` : 'Select a Ride';
  }

  // ✅ Request ride from backend
  requestRide() {
    if (!this.selectedRide) {
      alert("Please select a ride option first.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

    const payload: RideBooking = {
      pickupLocation: this.pickup,
      dropoffLocation: this.dropoff,
      fare: this.selectedRide.fare,
      status: "PENDING",
      rideTime: new Date(),
      user: { id: user.id } as any  // ✅ only send userId
    };

    this.rideBookingService.requestRide(payload).subscribe({
      next: (res) => {
        alert(`Ride requested successfully. Waiting for driver...`);
      },
      error: (err) => {
        console.error("❌ Error requesting ride:", err);
        alert("Failed to request ride.");
      }
    });
  }


  openPaymentModal() {
    this.showPaymentModal = true;
  }

  closePaymentModal() {
    this.showPaymentModal = false;
  }

  // --- Cash Flow ---
  selectCash() {
    this.showPaymentModal = false;
    this.showCashConfirmModal = true;
  }

  confirmCash() {
    this.showCashConfirmModal = false;
    this.selectedPayment = 'Cash';
    
  }

  // --- Gift Card Flow ---
  selectGiftCard() {
    this.showPaymentModal = false;
    this.showGiftCardModal = true;
  }

  applyGiftCard() {
    if (this.giftCardCode.trim() !== '') {
      this.selectedPayment = 'Gift card';
    }
    this.showGiftCardModal = false;
  }

  // --- UPI Flow ---
  selectUpi() {
    this.showPaymentModal = false;
    this.showUpiModal = true;
  }
  confirmUpi() {
    if (this.upiAddress.trim() !== '') {
      this.selectedPayment = 'UPI';
    }
    this.showUpiModal = false;
  }
}
