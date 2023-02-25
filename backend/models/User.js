import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    minlength: [3, "Name must be at least 3 characters long."],
    maxlength: [20, "Name must be at most 20 characters long."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email.",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: [6, "Password must be at least 6 characters long."],
    select: false,
  },

  lastName: {
    type: String,
    minlength: [3, "Name must be at least 3 characters long."],
    maxlength: [20, "Name must be at most 20 characters long."],
    trim: true,
    default: "lastName",
  },
});

UserSchema.pre("save" /* or "update" */, async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified("name"));
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = async function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
    //expiresIn: "100",
  });
  return token;
};

//Compare passwords
UserSchema.methods.comparePasswords = async function (currentPassword) {
  const isMatch = await bcrypt.compare(currentPassword, this.password);
  return isMatch;
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
