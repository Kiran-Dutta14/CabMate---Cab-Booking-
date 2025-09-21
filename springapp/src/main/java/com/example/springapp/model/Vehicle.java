package com.example.springapp.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data

public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String plateNumber;
    private String model;
    private String type; // Car, Bike, Auto
    private String color;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"vehicle", "rides"})
    @JoinColumn(name = "driver_id")
    private Driver driver;


    private String status;         // Active / Maintenance / Inactive
    private LocalDate added;       // Date added to system
    private Integer year;          // Manufacturing year
    private String name;           // Display name for UI

    // ✅ Default values initializer
    @PrePersist
    public void prePersist() {
        if (status == null) status = "Active";
        if (added == null) added = LocalDate.now();
        if (name == null && model != null) {
            this.name = model + " (" + color + ")";
        }
    }
}