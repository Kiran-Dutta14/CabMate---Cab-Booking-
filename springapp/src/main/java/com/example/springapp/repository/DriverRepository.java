package com.example.springapp.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springapp.model.Driver;

import java.util.List;
import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    Driver findByLicenseNumber(String licenseNumber);
    Optional<Driver> findByEmail(String email);
    Optional<Driver> findByEmailAndPassword(String email, String password);
    Optional<Driver> findByPhoneAndPassword(String phone, String password);

    List<Driver> findByStatusIgnoreCase(String status);
}

