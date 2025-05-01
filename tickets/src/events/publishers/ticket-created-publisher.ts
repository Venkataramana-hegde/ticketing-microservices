import { Publisher, Subjects, TicketCreatedEvent } from "@ticketingmicroservice/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
  