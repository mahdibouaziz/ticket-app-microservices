import mongoose from "mongoose";
import { app } from "./app";

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
