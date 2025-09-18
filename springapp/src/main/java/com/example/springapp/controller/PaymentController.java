package com.example.springapp.controller;

import com.example.springapp.model.Payment;
import com.example.springapp.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/process")
    public Payment processPayment(@RequestBody Payment payment) {
        return paymentService.processPayment(payment);
    }

    @GetMapping("/ride/{rideId}")
    public Payment getPaymentByRide(@PathVariable Long rideId) {
        return paymentService.getPaymentByRide(rideId);
    }
}

