package com.example.springapp.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data

public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String paymentMethod; // UPI, Card, Cash
    private Double amount;
    private String status; // SUCCESS, FAILED, PENDING

    @OneToOne
    @JoinColumn(name = "ride_id")
    private RideBooking ride;
}
