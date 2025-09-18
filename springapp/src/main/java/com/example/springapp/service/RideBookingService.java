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

    public RideBooking bookRide(RideBooking ride) {
        ride.setStatus("BOOKED");
        return ridebookingRepository.save(ride);
    }

    public RideBooking updateRideStatus(Long rideId, String status) {
        Optional<RideBooking> rideOpt = ridebookingRepository.findById(rideId);
        if (rideOpt.isPresent()) {
            RideBooking ride = rideOpt.get();
            ride.setStatus(status);
            return ridebookingRepository.save(ride);
        }
        return null;
    }

    public List<RideBooking> getUserRides(Long userId) {
        return ridebookingRepository.findByUserId(userId);
    }

    public List<RideBooking> getDriverRides(Long driverId) {
        return ridebookingRepository.findByDriverId(driverId);
    }
}
