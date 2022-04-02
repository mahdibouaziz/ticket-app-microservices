import { CustomError } from "./custom-error";

export class NotFoundCustomError extends CustomError {
  message = "Route Not found";
  statusCode = 404;

  constructor() {
    super("Database connection error");
    // this line because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundCustomError.prototype);
  }

  serializeErrors() {
    const formattedErrors = [
      {
        message: this.message,
      },
    ];
    return formattedErrors;
  }
}
