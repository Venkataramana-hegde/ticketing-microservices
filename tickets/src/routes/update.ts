import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@ticketingmicroservice/common";
import { Ticket } from "../models/ticket";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0"),
  ], validateRequest, 
  async (req: Request, res: Response) => {
    console.log("Update route hit");
    const ticket = await Ticket.findById(req.params.id);
    console.log("Found ticket:", ticket?.id);
    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    });
    await ticket.save();


    // try {
    //   await new TicketUpdatedPublisher(natsWrapper.client).publish({
    //     id: ticket.id,
    //     title: ticket.title,
    //     price: ticket.price,
    //     userId: ticket.userId,
    //   });
    //   console.log("✅ Event acknowledged by NATS");
    // } catch (err) {
    //   console.error("❌ Publish failed:", err);
    //   throw err; // This will make the API return 500
    // }
    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId
    });
    console.log("Event published successfully");

    res.send(ticket);
  }  
);
  
export { router as updateTicketRouter };
