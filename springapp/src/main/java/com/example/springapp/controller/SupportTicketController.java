package com.example.springapp.controller;

import com.example.springapp.model.SupportTicket;
import com.example.springapp.service.SupportTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class SupportTicketController {

    @Autowired
    private SupportTicketService ticketService;

    @PostMapping("/create")
    public SupportTicket createTicket(@RequestBody SupportTicket ticket) {
        return ticketService.createTicket(ticket);
    }

    @GetMapping("/user/{userId}")
    public List<SupportTicket> getTicketsByUser(@PathVariable Long userId) {
        return ticketService.getTicketsByUser(userId);
    }

    @PutMapping("/{ticketId}/resolve")
    public SupportTicket resolveTicket(@PathVariable Long ticketId, @RequestParam Long adminId) {
        return ticketService.resolveTicket(ticketId, adminId);
    }
}

