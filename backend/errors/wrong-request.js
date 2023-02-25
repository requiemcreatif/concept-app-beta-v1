import ApiError from "./api-error.js";
import { StatusCodes } from "http-status-codes";

class WrongRequestError extends ApiError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.BAD_REQUEST;
  }
}

export default WrongRequestError;
