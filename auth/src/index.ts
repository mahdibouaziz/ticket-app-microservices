import express from "express";
import "express-async-errors"; // 3rd party library to handle errors correctly in async functions
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundCustomError } from "./errors/not-found-custom-error";

const app = express();
app.set("trust proxy", true);

// bosy parser
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// if the request don't match anything
app.all("**", (req, res) => {
  throw new NotFoundCustomError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is missing");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to the database");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log("auth -  listening on port 3000");
  });
};

start();
