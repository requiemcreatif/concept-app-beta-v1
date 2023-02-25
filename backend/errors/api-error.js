class ApiError extends Error {
  constructor(message) {
    super(message);
    //this.statusCodes = StatusCodes.BAD_REQUEST;
  }
}

export default ApiError;
