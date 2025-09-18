package com.example.springapp.repository;

import com.example.springapp.model.SupportTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {

    // Tickets created by a user
    List<SupportTicket> findByCreatedById(Long userId);

    // Tickets resolved by an admin (using just adminId)
    List<SupportTicket> findByResolvedById(Long adminId);
}
