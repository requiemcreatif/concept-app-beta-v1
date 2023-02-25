import ApiError from "./api-error.js";
import { StatusCodes } from "http-status-codes";

class ErrorNotFound extends ApiError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.NOT_FOUND;
  }
}

export default ErrorNotFound;
