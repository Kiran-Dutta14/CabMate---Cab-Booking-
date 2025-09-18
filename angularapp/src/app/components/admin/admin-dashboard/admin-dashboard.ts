import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements AfterViewInit {
  ngAfterViewInit(): void {
    this.loadMonthlyChart();
    this.loadStatusChart();
  }

  loadMonthlyChart() {
    new Chart("monthlyChart", {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [{
          label: "Rides",
          data: [50, 75, 60, 90, 120, 100, 140, 160],
          borderColor: "#2563eb",
          backgroundColor: "rgba(37, 99, 235, 0.2)",
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: "#2563eb"
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
    new Chart("statusChart", {
      type: 'doughnut',
      data: {
        labels: ["Completed", "In Progress", "Open"],
        datasets: [{
          data: [65, 25, 10],
          backgroundColor: ["#16a34a", "#0284c7", "#dc2626"],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: { boxWidth: 15 }
          }
        },
        cutout: "70%"  // donut style
      }
    });
  }
}
