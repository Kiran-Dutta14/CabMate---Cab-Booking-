package com.example.springapp.controller;

import com.example.springapp.model.Vehicle;
import com.example.springapp.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:4200")  
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping("/register")
    public Vehicle registerVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.registerVehicle(vehicle);
    }

    @GetMapping("/driver/{driverId}")
    public List<Vehicle> getVehiclesByDriver(@PathVariable Long driverId) {
        return vehicleService.getVehiclesByDriver(driverId);
    }

    // Get all vehicles
    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    // Get vehicle by ID
    @GetMapping("/{id}")
    public Vehicle getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id);
    }

    // Update vehicle
    @PutMapping("/{id}")
    public Vehicle updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicle) {
        return vehicleService.updateVehicle(id, vehicle);
    }

    // Delete vehicle
    @DeleteMapping("/{id}")
    public void deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
    }

    // Get vehicles by status (Active, Maintenance, Inactive)
    @GetMapping("/status/{status}")
    public List<Vehicle> getVehiclesByStatus(@PathVariable String status) {
        return vehicleService.getVehiclesByStatus(status);
    }

    // ✅ Get vehicle by plate number
    @GetMapping("/plate/{plateNumber}")
    public Vehicle getVehicleByPlateNumber(@PathVariable String plateNumber) {
        return vehicleService.getVehicleByPlateNumber(plateNumber);
    }


    // Count vehicles (optional, for dashboard metrics)
    @GetMapping("/count")
    public long getVehicleCount() {
        return vehicleService.getVehicleCount();
    }
}
