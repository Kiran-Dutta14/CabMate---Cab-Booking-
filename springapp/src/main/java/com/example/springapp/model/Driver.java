package com.example.springapp.model;


import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data

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
}