// src/app/admin/admin-dashboard.ts
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { DriverService } from '../../../services/driver';
import { VehicleService } from '../../../services/vehicle';
import { UserService } from '../../../services/user';
import { SupportTicketService } from '../../../services/support-ticket';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [Sidebar,RouterModule], 
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements AfterViewInit, OnInit {

  // ✅ Dashboard counts
  totalDrivers = 0;
  totalVehicles = 0;
  totalUsers = 0;
  openTickets = 0;

  constructor(
    private driverService: DriverService,
    private vehicleService: VehicleService,
    private userService: UserService,
    private supportTicketService: SupportTicketService
  ) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  ngAfterViewInit(): void {
    this.loadMonthlyChart();
    this.loadStatusChart();
  }

   // ✅ Load counts from backend
  loadCounts(): void {
    this.driverService.getCount().subscribe(
      (data: number) => this.totalDrivers = data,
      error => console.error('Error fetching driver count:', error)
    );

    this.vehicleService.getCount().subscribe(
      (data: number) => this.totalVehicles = data,
      error => console.error('Error fetching vehicle count:', error)
    );

    this.userService.getCount().subscribe(
      (data: number) => this.totalUsers = data,
      error => console.error('Error fetching user count:', error)
    );

    this.supportTicketService.getOpenCount().subscribe(
      (data: number) => this.openTickets = data,
      error => console.error('Error fetching ticket count:', error)
    );
  }

  loadMonthlyChart() {
    new Chart('monthlyChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
          label: 'Rides',
          data: [50, 75, 60, 90, 120, 100, 140, 160],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: '#2563eb'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  loadStatusChart() {
    new Chart('statusChart', {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'Open'],
        datasets: [{
          data: [65, 25, 10],
          backgroundColor: ['#16a34a', '#0284c7', '#dc2626'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 15 }
          }
        },
        cutout: '70%'
      }
    });
  }
}
