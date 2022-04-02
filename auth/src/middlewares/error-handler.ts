import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // our custom errors
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // generic error
  console.log("Something went wrong", err);
  const formattedErrors = [
    {
      message: "Something went wrong",
    },
  ];
  res.status(400).send({
    errors: formattedErrors,
  });
};
