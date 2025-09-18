import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-riders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './riders.html',
  styleUrls: ['./riders.css']
})
export class Riders {
  pickup = '';
  destination = '';
  reserveDate = '';
  reserveTime = '';

  seePrices() {
    if (!this.pickup.trim() || !this.destination.trim()) {
      alert('Please enter both pickup and destination.');
      return;
    }
    alert(`Estimated prices for ride from "${this.pickup}" to "${this.destination}" will be shown here.`);
  }

  scheduleLater() {
    if (!this.pickup.trim() || !this.destination.trim()) {
      alert('Please enter both pickup and destination.');
      return;
    }
    alert(`You can now schedule a ride later from "${this.pickup}" to "${this.destination}".`);
  }

  reserveRide() {
    if (!this.reserveDate || !this.reserveTime) {
      alert('Please choose both date and time.');
      return;
    }
    alert(`Your ride has been reserved for ${this.reserveDate} at ${this.reserveTime}. ✅`);
  }
}
