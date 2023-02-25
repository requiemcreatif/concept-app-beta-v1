import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const CodeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a code title."],
      maxlength: [50, "Title must be at most 50 characters long."],
    },
    language: {
      type: String,
      enum: ["JavaScript", "HTML", "CSS", "React", "Node", "Express", "MongoDB", "all"],
      required: [true, "Please select a language or framework."],
      default: "JavaScript",
    },
    description: {
      type: String,
      required: [true, "Please provide a description."],
      maxlength: [500, "Description must be at most 500 characters long."],
    },
    code: {
      type: String,
      required: [true, "Please, provide a code."],
    },

    codeStatus: {
      type: String,
      enum: ["rejected", "approved", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "You need to provide a user."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Code", CodeSchema);
