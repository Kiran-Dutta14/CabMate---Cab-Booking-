package com.example.springapp.service;

import com.example.springapp.model.Vehicle;
import com.example.springapp.model.Driver;
import com.example.springapp.repository.VehicleRepository;
import com.example.springapp.repository.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final DriverRepository driverRepository;

    public VehicleService(VehicleRepository vehicleRepository, DriverRepository driverRepository) {
        this.vehicleRepository = vehicleRepository;
        this.driverRepository = driverRepository;
    }

    // Register a new vehicle
    public Vehicle registerVehicle(Vehicle vehicle) {
        if (vehicle.getDriver() != null && vehicle.getDriver().getId() != null) {
            // Fetch driver from DB to avoid null fields
            Driver driver = driverRepository.findById(vehicle.getDriver().getId())
                    .orElseThrow(() -> new RuntimeException(
                            "Driver not found with id " + vehicle.getDriver().getId()));
            vehicle.setDriver(driver);
        }
        return vehicleRepository.save(vehicle);
    }

    // Get all vehicles
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // Get vehicle by ID
    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id " + id));
    }

    // Get all vehicles for a specific driver
    public List<Vehicle> getVehiclesByDriver(Long driverId) {
        return vehicleRepository.findByDriverId(driverId);
    }


    // Delete vehicle by ID
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }

    // ✅ Update vehicle
    public Vehicle updateVehicle(Long id, Vehicle vehicle) {
        Vehicle existing = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id " + id));

        // Update fields only if provided
        existing.setPlateNumber(vehicle.getPlateNumber() != null ? vehicle.getPlateNumber() : existing.getPlateNumber());
        existing.setModel(vehicle.getModel() != null ? vehicle.getModel() : existing.getModel());
        existing.setType(vehicle.getType() != null ? vehicle.getType() : existing.getType());
        existing.setColor(vehicle.getColor() != null ? vehicle.getColor() : existing.getColor());
        existing.setStatus(vehicle.getStatus() != null ? vehicle.getStatus() : existing.getStatus());
        existing.setYear(vehicle.getYear() != null ? vehicle.getYear() : existing.getYear());
        existing.setName(vehicle.getName() != null ? vehicle.getName() : existing.getName());
        existing.setAdded(vehicle.getAdded() != null ? vehicle.getAdded() : existing.getAdded());

        if (vehicle.getDriver() != null && vehicle.getDriver().getId() != null) {
            Driver driver = driverRepository.findById(vehicle.getDriver().getId())
                    .orElseThrow(() -> new RuntimeException(
                            "Driver not found with id " + vehicle.getDriver().getId()));
            existing.setDriver(driver);
        }

        return vehicleRepository.save(existing);
    }

    // ✅ Get vehicles by status
    public List<Vehicle> getVehiclesByStatus(String status) {
        return vehicleRepository.findByStatusIgnoreCase(status);
    }

    // ✅ Get vehicle by plate number
    public Vehicle getVehicleByPlateNumber(String plateNumber) {
        return vehicleRepository.findByPlateNumber(plateNumber)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with plate number " + plateNumber));
    }


    // ✅ Count all vehicles
    public long getVehicleCount() {
        return vehicleRepository.count();
    }
}
