import { NotAuthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new NotAuthenticatedError("You are not authorized to perform this action.");
};

export default checkPermissions;
