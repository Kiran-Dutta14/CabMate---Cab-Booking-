import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attach-car',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './attach-car.html',
  styleUrls: ['./attach-car.css']
})
export class AttachCar {
  driver = {
    name: '',
    phone: '',
    city: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.driver.name || !this.driver.phone || !this.driver.city) {
      alert('❌ Please fill in all fields.');
      return;
    }

    alert('✅ Application Submitted Successfully! Our team will contact you shortly.');
    this.router.navigate(['/drivers']); // redirect back to drivers page
  }
}
