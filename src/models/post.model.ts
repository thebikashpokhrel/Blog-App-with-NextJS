import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema(
  {
    content: String,
  },
  {
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    content: String,
    slug: {
      type: String,
      unique: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
