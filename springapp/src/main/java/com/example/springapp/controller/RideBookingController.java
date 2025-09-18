package com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.springapp.service.RideBookingService;
import com.example.springapp.model.RideBooking;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
public class RideBookingController {

    @Autowired
    private RideBookingService ridebookingService;

    @PostMapping("/book")
    public RideBooking bookRide(@RequestBody RideBooking ride) {
        return ridebookingService.bookRide(ride);
    }

    @PutMapping("/{rideId}/status")
    public RideBooking updateRideStatus(@PathVariable Long rideId, @RequestParam String status) {
        return ridebookingService.updateRideStatus(rideId, status);
    }

    @GetMapping("/user/{userId}")
    public List<RideBooking> getUserRides(@PathVariable Long userId) {
        return ridebookingService.getUserRides(userId);
    }

    @GetMapping("/driver/{driverId}")
    public List<RideBooking> getDriverRides(@PathVariable Long driverId) {
        return ridebookingService.getDriverRides(driverId);
    }
}
