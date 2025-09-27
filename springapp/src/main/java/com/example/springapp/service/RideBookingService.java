package com.example.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.RideBooking;
import com.example.springapp.repository.DriverRepository;
import com.example.springapp.repository.RideBookingRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RideBookingService {

    @Autowired
    private RideBookingRepository ridebookingRepository;

    @Autowired
    private DriverRepository driverRepository;

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

            // ✅ If ride is completed, update driver's earnings
            if ("COMPLETED".equalsIgnoreCase(status) && ride.getDriver() != null) {
                var driver = ride.getDriver();

                double currentEarnings = driver.getEarnings(); // defaults to 0.0 if primitive
                double rideFare = ride.getFare() != null ? ride.getFare() : 0.0;

                driver.setEarnings(currentEarnings + rideFare);
                driverRepository.save(driver); // ✅ persist driver earnings
            }

            return ridebookingRepository.save(ride);
        }
        throw new RuntimeException("Ride not found!");
    }

    // ✅ NEW: Complete ride directly (updates status + earnings)
    public RideBooking completeRide(Long rideId) {
        Optional<RideBooking> rideOpt = ridebookingRepository.findById(rideId);
        if (rideOpt.isPresent()) {
            RideBooking ride = rideOpt.get();

            if (ride.getDriver() == null) {
                throw new RuntimeException("Ride has no assigned driver!");
            }

            ride.setStatus("COMPLETED");

            // ✅ Update driver earnings
            var driver = ride.getDriver();
            double currentEarnings = driver.getEarnings() != 0 ? driver.getEarnings() : 0.0;
            double rideFare = ride.getFare() != null ? ride.getFare() : 0.0;

            driver.setEarnings(currentEarnings + rideFare);
            driverRepository.save(driver);

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

    // Get rides by status (e.g., all PENDING rides for drivers)
    public List<RideBooking> getRidesByStatus(String status) {
        return ridebookingRepository.findByStatus(status);
    }

    // ✅ Get rides with no driver but booked
    public List<RideBooking> getPendingRides() {
        return ridebookingRepository.findByDriverIsNullAndStatus("BOOKED");
    }


    // Assign driver to ride (accept)

    public RideBooking assignDriverToRide(Long rideId, Long driverId, String status) {
        Optional<RideBooking> rideOpt = ridebookingRepository.findById(rideId);
        if (rideOpt.isPresent()) {
            RideBooking ride = rideOpt.get();

            // fetch the driver entity
            var driver = driverRepository.findById(driverId)
                    .orElseThrow(() -> new RuntimeException("Driver not found!"));

            ride.setDriver(driver); // ✅ assign driver entity
            ride.setStatus(status);

            return ridebookingRepository.save(ride);
        }
        throw new RuntimeException("Ride not found!");
    }
}