package com.example.springapp.controller;

import com.example.springapp.model.RideBooking;
import com.example.springapp.service.RideBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
@CrossOrigin(origins = "http://localhost:4200")
public class RideBookingController {

    @Autowired
    private RideBookingService rideBookingService;

    // ✅ Get all rides
    @GetMapping
    public List<RideBooking> getAllRides() {
        return rideBookingService.getAllRides();
    }

    // ✅ Get ride by ID
    @GetMapping("/{id}")
    public RideBooking getRideById(@PathVariable Long id) {
        return rideBookingService.getRideById(id);
    }

    // ✅ Create a ride (always starts as BOOKED)
    @PostMapping
    public RideBooking createRide(@RequestBody RideBooking rideBooking) {
        return rideBookingService.bookRide(rideBooking);
    }

    // ✅ Update ride status
    @PutMapping("/{id}/status")
    public RideBooking updateRideStatus(@PathVariable Long id, @RequestParam String status) {
        return rideBookingService.updateRideStatus(id, status);
    }

    // ✅ Delete ride
    @DeleteMapping("/{id}")
    public void deleteRide(@PathVariable Long id) {
        rideBookingService.deleteRide(id);
    }

    // ✅ Rides by Driver
    @GetMapping("/driver/{driverId}")
    public List<RideBooking> getRidesByDriver(@PathVariable Long driverId) {
        return rideBookingService.getDriverRides(driverId);
    }

    // ✅ Rides by User
    @GetMapping("/user/{userId}")
    public List<RideBooking> getRidesByUser(@PathVariable Long userId) {
        return rideBookingService.getUserRides(userId);
    }

    // ✅ Rides by Driver & Status
    @GetMapping("/driver/{driverId}/status/{status}")
    public List<RideBooking> getDriverRidesByStatus(@PathVariable Long driverId, @PathVariable String status) {
        return rideBookingService.getDriverRidesByStatus(driverId, status);
    }

    // ✅ Rides by User & Status
    @GetMapping("/user/{userId}/status/{status}")
    public List<RideBooking> getUserRidesByStatus(@PathVariable Long userId, @PathVariable String status) {
        return rideBookingService.getUserRidesByStatus(userId, status);
    }
}
