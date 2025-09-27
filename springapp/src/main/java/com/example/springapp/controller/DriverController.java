package com.example.springapp.controller;

import com.example.springapp.model.Driver;
import com.example.springapp.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "http://localhost:4200")
public class DriverController {

    @Autowired
    private DriverRepository driverRepository;

    // ✅ Register Driver (plain text password)
    @PostMapping
    public Driver registerDriver(@RequestBody Driver driver) {
        // Check if email already exists
        if (driverRepository.findByEmail(driver.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered!");
        }

        // ✅ Set default values if not provided
        if (driver.getStatus() == null) driver.setStatus("Active");
        if (driver.getRating() == 0) driver.setRating(5.0);
        if (driver.getEarnings() == 0) driver.setEarnings(0.0);
        if (driver.getJoined() == null) driver.setJoined(LocalDate.now());

        // Directly save password in plain text ⚠️ (not secure)
        return driverRepository.save(driver);
    }

    // ✅ Login Driver (by email or phone, plain text password)
    @PostMapping("/login")
    public Driver loginDriver(@RequestBody LoginRequest loginRequest) {
        String identifier = loginRequest.getIdentifier();
        String password = loginRequest.getPassword();

        // Try by email + password
        return driverRepository.findByEmailAndPassword(loginRequest.getIdentifier(), loginRequest.getPassword())
                .orElseGet(() ->
                        // Try by phone + password
                        driverRepository.findByPhoneAndPassword(loginRequest.getIdentifier(), loginRequest.getPassword())
                                .orElseThrow(() -> new RuntimeException("Invalid credentials!"))
                );
    }

    // ✅ Get all drivers
    @GetMapping
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    // ✅ Get driver by ID
    @GetMapping("/{id}")
    public Driver getDriverById(@PathVariable Long id) {
        return driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found!"));
    }

    // ✅ Update driver
    @PutMapping("/{id}")
    public Driver updateDriver(@PathVariable Long id, @RequestBody Driver driver) {
        driver.setId(id);
        return driverRepository.save(driver);
    }

    // ✅ Delete driver
    @DeleteMapping("/{id}")
    public void deleteDriver(@PathVariable Long id) {
        driverRepository.deleteById(id);
    }

     // ✅ New endpoint: Count drivers (for dashboard metrics if needed)
    @GetMapping("/count")
    public long getDriverCount() {
        return driverRepository.count();
    }

    // ✅ New endpoint: Get drivers by status (for filtering in Angular dropdown)
    @GetMapping("/status/{status}")
    public List<Driver> getDriversByStatus(@PathVariable String status) {
        return driverRepository.findByStatusIgnoreCase(status);
    }

    // DTO for login
    static class LoginRequest {
        private String identifier; // email or phone
        private String password;

        public String getIdentifier() { return identifier; }
        public void setIdentifier(String identifier) { this.identifier = identifier; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
