import { CustomError } from "./custom-error";

export class NotFoundCustomError extends CustomError {
  statusCode = 404;
  reason = "route not found";

  constructor() {
    super("Route not found");

    // this line because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
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
