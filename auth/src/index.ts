import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundCustomError } from "./errors/not-found-custom-error";

const app = express();

// bosy parser
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// if the request don't match anything
app.all("**", (req, res) => {
  throw new NotFoundCustomError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("auth -  listening on port 3000");
});
