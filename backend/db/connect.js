import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import dotenv from "dotenv";
dotenv.config();

const connectDB = async (url) => {
  return mongoose.connect(url);
};

export default connectDB;
