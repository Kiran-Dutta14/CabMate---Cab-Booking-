package com.example.springapp.service;

import com.example.springapp.model.Driver;
import com.example.springapp.repository.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {

    private final DriverRepository driverRepository;

    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    // Register driver
    public Driver registerDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    // Get driver by license
    public Driver getDriverByLicense(String licenseNumber) {
        return driverRepository.findByLicenseNumber(licenseNumber);
    }

    // Get all drivers
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    // Delete driver by license
    public void deleteDriverByLicense(String licenseNumber) {
        Driver driver = driverRepository.findByLicenseNumber(licenseNumber);
        if (driver != null) {
            driverRepository.delete(driver);
        }
    }
}
