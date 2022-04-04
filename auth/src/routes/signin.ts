import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";

import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    // email must be an email
    body("email").isEmail().withMessage("Email must be valid"),
    // password must be at least 5 chars long
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must be not empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // check if the email already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    // check the password
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    // create jwt and store it as a cookie in the client side
    const userJwt = await jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY as string
    );

    // store jwt on the session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
