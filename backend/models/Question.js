import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
  },
  category: {
    type: String,
    required: true,
    enum: ["JavaScript", "HTML", "CSS", "React", "Node", "Express", "MongoDB"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Question", QuestionSchema);
