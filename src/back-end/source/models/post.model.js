import mongoose from "mongoose";
const { Schema } = mongoose;

// Create Post model
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  creator: {
    type: String,
    required: false,
  },
});

export const Post = mongoose.model("Post", postSchema);
