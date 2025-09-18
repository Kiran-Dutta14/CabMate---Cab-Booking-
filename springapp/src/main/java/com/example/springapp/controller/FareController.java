package com.example.springapp.controller;

import com.example.springapp.model.Fare;
import com.example.springapp.service.FareService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fares")
@RequiredArgsConstructor // ✅ Injects FareService via constructor
public class FareController {

    private final FareService fareService;

    @PostMapping
    public Fare createOrUpdateFare(@RequestBody Fare fare) {
        return fareService.saveFare(fare);
    }

    @GetMapping
    public List<Fare> getAllFares() {
        return fareService.getAllFares();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fare> getFareById(@PathVariable Long id) {
        return fareService.getFareById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/vehicle/{vehicleType}")
    public ResponseEntity<Fare> getFareByVehicleType(@PathVariable String vehicleType) {
        Fare fare = fareService.getFareByVehicleType(vehicleType);
        return (fare != null) ? ResponseEntity.ok(fare) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFare(@PathVariable Long id) {
        fareService.deleteFare(id);
        return ResponseEntity.ok("Fare with ID " + id + " deleted successfully.");
    }
}
