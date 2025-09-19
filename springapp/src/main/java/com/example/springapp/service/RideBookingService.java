package com.example.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.RideBooking;
import com.example.springapp.repository.RideBookingRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RideBookingService {

    @Autowired
    private RideBookingRepository ridebookingRepository;

    // ✅ Book ride (always starts as BOOKED)
    public RideBooking bookRide(RideBooking ride) {
        ride.setStatus("BOOKED");
        return ridebookingRepository.save(ride);
    }

    // ✅ Update ride status
    public RideBooking updateRideStatus(Long rideId, String status) {
        Optional<RideBooking> rideOpt = ridebookingRepository.findById(rideId);
        if (rideOpt.isPresent()) {
            RideBooking ride = rideOpt.get();
            ride.setStatus(status);
            return ridebookingRepository.save(ride);
        }
        throw new RuntimeException("Ride not found!");
    }

    // ✅ Get all rides
    public List<RideBooking> getAllRides() {
        return ridebookingRepository.findAll();
    }

    // ✅ Get ride by ID
    public RideBooking getRideById(Long id) {
        return ridebookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ride not found!"));
    }

    // ✅ Delete ride
    public void deleteRide(Long id) {
        ridebookingRepository.deleteById(id);
    }

    // ✅ Get rides by user
    public List<RideBooking> getUserRides(Long userId) {
        return ridebookingRepository.findByUserId(userId);
    }

    // ✅ Get rides by driver
    public List<RideBooking> getDriverRides(Long driverId) {
        return ridebookingRepository.findByDriverId(driverId);
    }

    // ✅ Get rides by user + status
    public List<RideBooking> getUserRidesByStatus(Long userId, String status) {
        return ridebookingRepository.findByUserIdAndStatus(userId, status);
    }

    // ✅ Get rides by driver + status
    public List<RideBooking> getDriverRidesByStatus(Long driverId, String status) {
        return ridebookingRepository.findByDriverIdAndStatus(driverId, status);
    }
}