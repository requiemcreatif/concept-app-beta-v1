import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { WrongRequestError, NotAuthenticatedError } from "../errors/index.js";
//import { use } from "express/lib/router/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new WrongRequestError("Please you must provide all fields");
  }

  //Check if user already exists // Duplicate email
  const alreadyUser = await User.findOne({ email });
  if (alreadyUser) {
    throw new WrongRequestError("This email is already registered");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new WrongRequestError("This email is already registered");
  }

  const user = await User.create({ name, email, password });
  const token = await user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
    },
    token,
  });
  //res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new WrongRequestError("Please you must provide all fields");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new NotAuthenticatedError("Invalid credentials");
  }
  //console.log(user);
  const isMatchPassword = await user.comparePasswords(password);
  if (!isMatchPassword) {
    throw new NotAuthenticatedError("Invalid credentials");
  }
  const token = await user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

const updateUser = async (req, res) => {
  const { name, email, lastName } = req.body;
  if (!name || !email || !lastName) {
    throw new WrongRequestError("Please you must provide all fields");
  }
  const user = await User.findOne({
    _id: req.user.userId,
  });
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  await user.save();

  const token = await user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });

  res.send("Update user");
};

export { register, login, updateUser };
