
package com.example.springapp.controller;

import com.example.springapp.model.Driver;
import com.example.springapp.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "http://localhost:4200")
public class DriverController {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public Driver registerDriver(@RequestBody Driver driver) {
        // Check if email already exists
        if (driverRepository.findByEmail(driver.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered!");
        }

        // Encode password
        driver.setPassword(passwordEncoder.encode(driver.getPassword()));

        return driverRepository.save(driver);
    }

    @GetMapping
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    @GetMapping("/{id}")
    public Driver getDriverById(@PathVariable Long id) {
        return driverRepository.findById(id).orElseThrow(() -> new RuntimeException("Driver not found!"));
    }
}
