import { Publisher, Subjects, TicketUpdatedEvent } from "@ticketingmicroservice/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
