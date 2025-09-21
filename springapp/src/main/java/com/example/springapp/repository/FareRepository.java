package com.example.springapp.repository;

import com.example.springapp.model.Fare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FareRepository extends JpaRepository<Fare, Long> {

    // ✅ Find fare by vehicle type (case-insensitive)
    @Query("SELECT f FROM Fare f WHERE LOWER(f.vehicleType) = LOWER(?1) AND f.status = 'ACTIVE'")
    Fare findActiveFareByVehicleType(String vehicleType);

      // ✅ Find all active fare rules
    List<Fare> findByStatusIgnoreCase(String status);

    // ✅ Count fares by status
    long countByStatusIgnoreCase(String status);
}
