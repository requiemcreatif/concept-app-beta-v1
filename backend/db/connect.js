import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import dotenv from "dotenv";
dotenv.config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

const connectDB = async (url) => {
  return mongoose.connect(url);
};

export default connectDB;
