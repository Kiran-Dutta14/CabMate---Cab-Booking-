package com.example.springapp.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

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
}