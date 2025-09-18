package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "fares")
@Data  // ✅ Generates getters, setters, toString, equals, hashCode automatically
public class Fare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vehicleType;   // e.g., Sedan, SUV, Bike
    private Double baseFare;      // Minimum charge
    private Double perKm;         // Price per KM
    private Double perMinute;     // Price per minute
    private String status;        // ACTIVE / INACTIVE
}

