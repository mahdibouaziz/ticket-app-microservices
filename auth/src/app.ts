import express from "express";
import "express-async-errors"; // 3rd party library to handle errors correctly in async functions
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

export { app };
