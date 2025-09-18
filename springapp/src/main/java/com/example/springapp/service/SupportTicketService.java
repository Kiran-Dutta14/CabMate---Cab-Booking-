package com.example.springapp.service;

import com.example.springapp.model.SupportTicket;
import com.example.springapp.repository.SupportTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SupportTicketService {

    @Autowired
    private SupportTicketRepository supportTicketRepository;

    public SupportTicket createTicket(SupportTicket ticket) {
        return supportTicketRepository.save(ticket);
    }

    public List<SupportTicket> getTicketsByUser(Long userId) {
        return supportTicketRepository.findByCreatedById(userId);
    }

    public SupportTicket resolveTicket(Long ticketId, Long adminId) {
        Optional<SupportTicket> ticketOpt = supportTicketRepository.findById(ticketId);
        if (ticketOpt.isPresent()) {
            SupportTicket ticket = ticketOpt.get();
            ticket.setStatus("RESOLVED");
            return supportTicketRepository.save(ticket);
        }
        return null;
    }
}

