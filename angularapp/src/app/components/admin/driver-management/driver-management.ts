import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { Driver } from '../../../models/driver.model';
import { DriverService } from '../../../services/driver';


@Component({
  selector: 'app-driver-management',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar], 
  templateUrl: './driver-management.html',
  styleUrls: ['./driver-management.css']
})
export class DriverManagement implements OnInit {
  drivers: Driver[] = [];
  filteredDrivers: Driver[] = [];

  searchTerm: string = '';
  selectedStatus: string = '';

  // ✅ Modal State
  showAddDriverModal: boolean = false;
  newDriver: Driver = {
    name: '',
    phone: '',
    email: '',
    licenseNumber: '',
    password: 'default123',  // backend requires password
    status: 'Active'
  };

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.driverService.getAll().subscribe(
      (data: Driver[]) => {
        this.drivers = data;
        this.filteredDrivers = [...this.drivers]; // copy for filtering
      },
      (error: any) => {
        console.error('Error fetching drivers:', error);
      }
    );
  }
  
  // ✅ Modal controls
  openAddDriverModal(): void {
    this.showAddDriverModal = true;
  }

  closeAddDriverModal(): void {
    this.showAddDriverModal = false;
    this.resetNewDriver();
  }

  // ✅ Create driver
  addDriver(): void {
    this.driverService.create(this.newDriver).subscribe(
      (driver: Driver) => {
        console.log('Driver added:', driver);
        this.loadDrivers();             // refresh table
        this.closeAddDriverModal();     // close modal
      },
      (error: any) => {
        console.error('Error adding driver:', error);
      }
    );
  }

  private resetNewDriver(): void {
    this.newDriver = {
      name: '',
      phone: '',
      email: '',
      licenseNumber: '',
      password: 'default123',
      status: 'Active'
    };
  }


  // ✅ Apply text search filter
  applyFilter(): void {
    this.filteredDrivers = this.drivers.filter(d =>
      (d.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       d.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       d.phone?.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
    if (this.selectedStatus) {
      this.filteredDrivers = this.filteredDrivers.filter(d =>
        d.status?.toLowerCase() === this.selectedStatus.toLowerCase()
      );
    }
  }

  // ✅ Fetch drivers by status from backend
  filterByStatus(): void {
    if (!this.selectedStatus) {
      this.filteredDrivers = [...this.drivers]; // reset
    } else {
      this.driverService.getByStatus(this.selectedStatus).subscribe(
        (data: Driver[]) => {
          this.filteredDrivers = data;
        },
        (error: any) => {
          console.error('Error fetching drivers by status:', error);
        }
      );
    }
    // also re-apply search filter if any
    if (this.searchTerm) {
      this.applyFilter();
    }
  }
  
}
