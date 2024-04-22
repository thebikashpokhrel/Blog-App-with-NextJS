import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Choose unique username"],
    require: [true, "Username is required"],
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    require: [true, "Email is required"],
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
