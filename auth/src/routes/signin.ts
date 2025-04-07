import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import {validateRequest, BadRequestError } from '@ticketingmicroservice/common';

import { Password } from "../services/password";
import { User } from "../models/user";



const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    // console.log("Stored Hashed Password:", existingUser.password); 
    // console.log("Entered Password:", password); 
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    // console.log("Passwords Match:", passwordsMatch); 

    if (!passwordsMatch) {
      throw new BadRequestError("Invalid Credentials");
    }
    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    //store it in a session object
    req.session = {
      jwt: userJwt,
    };
    // console.log("Session at Signup:", req.session); 
    // console.log("Session at Signin:", req.session); 

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
