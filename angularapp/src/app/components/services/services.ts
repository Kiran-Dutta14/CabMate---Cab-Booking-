import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './services.html',
  styleUrls: ['./services.css']
})
export class Services {
  slideIndex = 0;

  services = [
    { title: 'Ride', desc: 'Go anywhere with CabMate. Request a ride, hop in, and go.', img: 'assets/images/ride.png' },
    { title: 'Reserve', desc: 'Reserve your ride in advance so you can relax on the day of your trip.', img: 'assets/images/reserve.png' },
    { title: 'Intercity', desc: 'Get convenient, affordable outstation cabs anytime at your door.', img: 'assets/images/intercity.png' },
    { title: 'Shuttle', desc: 'Lower-cost shared rides on professionally driven buses and vans.', img: 'assets/images/shuttle.png' },
    { title: 'Courier', desc: 'CabMate makes same-day item delivery easier than ever.', img: 'assets/images/courier.png' },
    { title: 'Rentals', desc: 'Request a trip for a block of time and make multiple stops.', img: 'assets/images/rentals.png' }
  ];

  changeSlide(n: number) {
    const totalSlides = 3; // we have 3 slideshow slides
    this.slideIndex = (this.slideIndex + n + totalSlides) % totalSlides;

    const slides = document.querySelector<HTMLElement>('.slides-container');
    if (slides) {
      slides.style.transform = `translateX(-${this.slideIndex * 100}%)`;
    }
  }

  ngOnInit() {
    setInterval(() => this.changeSlide(1), 5000);
  }
}

