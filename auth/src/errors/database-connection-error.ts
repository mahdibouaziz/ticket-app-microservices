import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason = "Error connecting to database";
  statusCode = 503;

  constructor() {
    super("Database connection error");
    // this line because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    const formattedErrors = [
      {
        message: this.reason,
      },
    ];
    return formattedErrors;
  }
}
