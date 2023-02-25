import mongoose from "mongoose";

const gptSchema = new mongoose.Schema({
  message: {
    type: String,
    //required: true,
  },
});

export default mongoose.model("gpt", gptSchema);
