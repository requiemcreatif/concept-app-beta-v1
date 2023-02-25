import { StatusCodes } from "http-status-codes";
import { WrongRequestError, ErrorNotFound, NotAuthenticatedError } from "../errors/index.js";
import Code from "../models/Code.js";
import checkPermissions from "../utility/checkPermissions.js";

const createCode = async (req, res) => {
  const { title, code } = req.body;

  if (!title || !code) {
    throw new WrongRequestError("Please provide all fields.");
  }
  req.body.createdBy = req.user.userId;
  const newCode = await Code.create(req.body);
  res.status(StatusCodes.CREATED).json({ newCode });
};

//GET ALL CODES

const getAllCodes = async (req, res) => {
  const { codeStatus, language, sort, search } = req.query;
  const query = {
    createdBy: req.user.userId,
  };

  if (codeStatus && codeStatus !== "all") {
    query.codeStatus = codeStatus;
  }

  if (language && language !== "all") {
    query.language = language;
  }

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  let result = Code.find(query);

  if (sort) {
    result = result.sort({ createdAt: sort });
  }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const codes = await result;

  const totalCodes = await Code.countDocuments(query);
  const numOfPages = Math.ceil(totalCodes / limit);
  res.status(StatusCodes.OK).json({ codes, totalCodes, numOfPages });
};

const getAllCodesFromAllUsers = async (req, res) => {
  const { codeStatus, language, sort, search } = req.query;
  const query = {};

  if (codeStatus && codeStatus !== "all") {
    query.codeStatus = codeStatus;
  }

  if (language && language !== "all") {
    query.language = language;
  }

  if (search) {
    query.title = { $regex: search, $options: "i" };
    query.description = { $regex: search, $options: "i" };
    query.code = { $regex: search, $options: "i" };
    query.language = { $regex: search, $options: "i" };
  }

  if (sort) {
    result = result.sort({ createdAt: sort });
  }

  let result = Code.find(query);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 200;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const codes = await result;
  const totalCodes = await Code.countDocuments(query);
  const numOfPages = Math.ceil(totalCodes / limit);

  res.status(StatusCodes.OK).json({ codes, totalCodes, numOfPages });
};

//UPDATE CODE
const updateCode = async (req, res) => {
  const { id: codeId } = req.params;
  const { title, description, code, language, codeStatus } = req.body;

  if (!title || !description || !code || !language || !codeStatus) {
    throw new WrongRequestError("Please provide all fields.");
  }

  const codeUpdate = await Code.findOne({ _id: codeId });

  if (!codeUpdate) {
    throw new ErrorNotFound(`Code not found with id: ${codeId}`);
  }

  // Check if the user is the owner of the code

  checkPermissions(req.user, codeUpdate.createdBy);

  const updatedCode = await Code.findOneAndUpdate({ _id: codeId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedCode });
};

//DELETE CODE
const deleteCode = async (req, res) => {
  const { id: codeId } = req.params;
  const code = await Code.findOne({ _id: codeId });

  if (!code) {
    throw new ErrorNotFound(`Code not found with id: ${codeId}`);
  }
  if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
  checkPermissions(req.user, code.createdBy);
  //await Code.remove();
  await Code.remove({ _id: codeId });

  res.status(StatusCodes.OK).json({ msg: "Code deleted successfully." });
};

export { createCode, getAllCodes, updateCode, deleteCode, getAllCodesFromAllUsers };
