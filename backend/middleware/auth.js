import jwt from "jsonwebtoken";
import { NotAuthenticatedError } from "../errors/index.js";

//NotAuthenticatedError

const auth = async (req, res, next) => {
  const headers = req.headers;
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new NotAuthenticatedError("Invalid authentication.");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    //req.user = payload;
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new NotAuthenticatedError("Invalid authentication.");
  }
};

export default auth;
