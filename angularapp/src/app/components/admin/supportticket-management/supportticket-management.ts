import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';

interface Ticket {
  id: number;
  subject: string;
  customer: string;
  email: string;
  phone: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  created: string;
}

@Component({
  selector: 'app-supportticket-management',
  standalone: true,
  imports: [CommonModule, NgIf, Sidebar],
  templateUrl: './supportticket-management.html',
  styleUrls: ['./supportticket-management.css']
})
export class SupportticketManagement {
  tickets: Ticket[] = [
    {
      id: 1,
      subject: 'Driver was late and unprofessional',
      customer: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 777-8888',
      description: 'My driver arrived 15 minutes late and was very rude during the ride. The car was also dirty and smelled bad. This is unacceptable service.  ',
      status: 'open',
      priority: 'high',
      category: 'driver complaint',
      created: 'Sep 11, 2025'
    },
    {
      id: 2,
      subject: 'Overcharged for my ride',
      customer: 'Mike Rodriguez',
      email: 'mike.rodriguez@email.com',
      phone: '+1 (555) 666-7777',
      description: 'I was charged extra for my last ride even though the fare was already calculated correctly.  ',
      status: 'closed',
      priority: 'medium',
      category: 'billing',
      created: 'Sep 11, 2025'
    },
    {
      id: 3,
      subject: 'App keeps crashing when booking',
      customer: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      phone: '+1 (555) 111-2222',
      description: 'Whenever I try to book a ride, the app crashes after selecting the destination.  ',
      status: 'open',
      priority: 'medium',
      category: 'technical',
      created: 'Sep 11, 2025'
    }
  ];

  selectedTicket: Ticket | null = null;

  selectTicket(ticket: Ticket) {
    this.selectedTicket = ticket;
  }
}
