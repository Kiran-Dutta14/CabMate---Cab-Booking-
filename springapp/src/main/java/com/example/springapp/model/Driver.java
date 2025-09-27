package com.example.springapp.model;


import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "driver")

public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String phone;
    private String email;
    private String licenseNumber;
    private String password;

    @OneToOne(mappedBy = "driver", cascade = CascadeType.ALL)
    private Vehicle vehicle;

    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL)
    private java.util.List<RideBooking> rides;

     // ✅ Newly Added Fields
    private String status; // e.g., Active / Suspended
    private double rating;      // default rating
    private double earnings = 0.0;    // total earnings
    private LocalDate joined; // date driver registered

    // ✅ Constructor ensures default values on registration
    public Driver() {
        this.status = "Active";
        this.rating = 5.0;
        this.earnings = 0.0;
        this.joined = LocalDate.now();
    }
}