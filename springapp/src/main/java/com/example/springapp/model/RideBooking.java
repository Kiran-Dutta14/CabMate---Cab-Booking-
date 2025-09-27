package com.example.springapp.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data

public class RideBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pickupLocation;
    private String dropoffLocation;
    private LocalDateTime rideTime;
    private Double fare;
    private String status; // e.g. BOOKED, ONGOING, COMPLETED, CANCELLED

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"password","rides"})
    private User user;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    @JsonIgnoreProperties({"password","rides"})
    private Driver driver;
}
