package com.example.springapp.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import com.example.springapp.model.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByDriverId(Long driverId);
    // ✅ Find by status (Active, Maintenance, Inactive)
    List<Vehicle> findByStatusIgnoreCase(String status);

    // ✅ Find by plate number (unique vehicle identifier)
    Optional<Vehicle> findByPlateNumber(String plateNumber);
}


