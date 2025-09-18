package com.example.springapp.controller;

import com.example.springapp.model.Vehicle;
import com.example.springapp.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
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
}
