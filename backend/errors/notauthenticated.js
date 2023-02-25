import { StatusCodes } from "http-status-codes";
import ApiError from "./api-error.js";

class NotAuthenticatedError extends ApiError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.UNAUTHORIZED;
  }
}

export default NotAuthenticatedError;
