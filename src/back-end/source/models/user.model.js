import mongoose from "mongoose";
const { Schema } = mongoose;

// Create User model
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
