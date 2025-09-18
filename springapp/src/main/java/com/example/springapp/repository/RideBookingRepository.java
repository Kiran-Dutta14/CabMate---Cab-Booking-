package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springapp.model.RideBooking;

import java.util.List;

@Repository
public interface RideBookingRepository extends JpaRepository<RideBooking, Long> {
    List<RideBooking> findByUserId(Long userId);
    List<RideBooking> findByDriverId(Long driverId);
    List<RideBooking> findByUserIdAndStatus(Long userId, String status);
    List<RideBooking> findByDriverIdAndStatus(Long driverId, String status);
}


    

