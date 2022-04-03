import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
    // this line because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
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
