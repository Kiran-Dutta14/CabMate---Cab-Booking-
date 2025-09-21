import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';

// ✅ Import service + model
import { VehicleService } from '../../../services/vehicle';
import { Vehicle } from '../../../models/vehicle.model';
import { DriverService } from '../../../services/driver';
import { Driver } from '../../../models/driver.model';

@Component({
  selector: 'app-vehicle-management',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './vehicle-management.html',
  styleUrls: ['./vehicle-management.css']
})
export class VehicleManagement implements OnInit {

  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];   // ✅ for table display
  drivers: Driver[] = [];   // for driver dropdown
  searchTerm: string = '';
  selectedStatus: string = ''; 

  // ✅ Modal state
  showAddVehicleModal = false;
  newVehicle: any = {
    make: '',
    model: '',
    year: null,
    color: '',
    plateNumber: '',
    type: '',
    driverId: ''
  };

  constructor(
    private vehicleService: VehicleService,
    private driverService: DriverService 
  )  {}

  ngOnInit(): void {
    this.loadVehicles();
    this.loadDrivers();
  }

  // ✅ Fetch real data from backend
  loadVehicles(): void {
    this.vehicleService.getAll().subscribe(
      (data: Vehicle[]) => {
        console.log('Fetched vehicles from backend:', data);
        this.vehicles = data || [];
        this.applyFilters();
      },
      (error: any) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  loadDrivers(): void {
    this.driverService.getAll().subscribe(
      (data: Driver[]) => {
        this.drivers = data || [];
        console.log("Fetched drivers:", this.drivers);
      },
      (error: any) => console.error('Error fetching drivers:', error)
    );
  }

   // ✅ Apply both search + status filters
  applyFilters(): void {
    let list = [...this.vehicles];

    if (this.selectedStatus) {
      list = list.filter(v => (v.status || '').toLowerCase() === this.selectedStatus.toLowerCase());
    }

    if (this.searchTerm) {
      const t = this.searchTerm.toLowerCase();
      list = list.filter(v =>
        (v.name || '').toLowerCase().includes(t) ||
        (v.license || '').toLowerCase().includes(t) 
      );
    }

    this.filteredVehicles = list;
  }

  // ✅ Modal controls
  openAddVehicleModal(): void {
    this.showAddVehicleModal = true;
  }

  closeAddVehicleModal(): void {
    this.showAddVehicleModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.newVehicle = {
      make: '',
      model: '',
      year: null,
      color: '',
      plateNumber: '',
      type: '',
      driverId: ''
    };
  }

  // ✅ Save new vehicle
  addVehicle(): void {
    const payload: Vehicle = {
      plateNumber: this.newVehicle.plateNumber,
      model: this.newVehicle.model,
      type: this.newVehicle.type,
      color: this.newVehicle.color,
      year: this.newVehicle.year,
      name: this.newVehicle.make + ' ' + this.newVehicle.model,
      driver: this.newVehicle.driverId ? { id: this.newVehicle.driverId } as Driver : undefined
    };

    this.vehicleService.create(payload).subscribe(
      () => {
        this.loadVehicles();       // refresh table
        this.closeAddVehicleModal();
      },
      (error: any) => console.error('Error adding vehicle:', error)
    );
  }

  // ✅ Triggered when user types in search box
  onSearchChange(): void {
    this.applyFilters();
  }

  // ✅ Triggered when status dropdown changes
  onStatusChange(): void {
    this.applyFilters();
  }
}
