package com.example.springapp.service;

import com.example.springapp.model.Payment;
import com.example.springapp.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment processPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment getPaymentByRide(Long rideId) {
        return paymentRepository.findByRideId(rideId);
    }
}
