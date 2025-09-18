export interface SupportTicket {
    id?: number;            // Optional since it's auto-generated
    subject: string;
    description: string;
    status: string;         // OPEN, IN_PROGRESS, RESOLVED
    createdById: number;    // User (Driver or Rider) who created the ticket
    resolvedById?: number;  // Admin who resolved the ticket (optional)
}
