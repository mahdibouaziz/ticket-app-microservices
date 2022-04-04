import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Not authorized");
    // this line because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    const formattedErrors = [
      {
        message: "Not authorized",
      },
    ];
    return formattedErrors;
  }
}
