import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  console.log(err);

  const defaultError = {
    statusCodes: err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "It seems like something went wrong, please try again later",
  };
  if (err.name === "ValidationError") {
    defaultError.statusCodes = StatusCodes.BAD_REQUEST;
    //defaultError.msg = err.message;
    defaultError.msg = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }
  if (err.code && err.code === 11000) {
    defaultError.statusCodes = StatusCodes.BAD_REQUEST;
    defaultError.msg = ` ${Object.keys(err.keyValue)} already exists`;
  }
  //res.status(defaultError.statusCodes).json({ msg: err });
  res.status(defaultError.statusCodes).json({ msg: defaultError.msg });
};

export default errorHandler;
