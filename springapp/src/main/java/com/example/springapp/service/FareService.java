package com.example.springapp.service;

import com.example.springapp.model.Fare;
import com.example.springapp.repository.FareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor // ✅ Auto-generates constructor for final fields
public class FareService {

    private final FareRepository fareRepository;

    public Fare saveFare(Fare fare) {
        return fareRepository.save(fare);
    }

    public Optional<Fare> getFareById(Long id) {
        return fareRepository.findById(id);
    }

    public List<Fare> getAllFares() {
        return fareRepository.findAll();
    }

    public void deleteFare(Long id) {
        fareRepository.deleteById(id);
    }

    public Fare getFareByVehicleType(String vehicleType) {
        return fareRepository.findActiveFareByVehicleType(vehicleType);
    }

    // ✅ Get fares by status (Active / Inactive)
    public List<Fare> getFaresByStatus(String status) {
        return fareRepository.findByStatusIgnoreCase(status);
    }

    // ✅ Count all fares
    public long getFareCount() {
        return fareRepository.count();
    }

    // ✅ Count fares by status
    public long getFareCountByStatus(String status) {
        return fareRepository.countByStatusIgnoreCase(status);
    }
}
