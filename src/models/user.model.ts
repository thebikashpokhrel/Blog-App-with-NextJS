import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
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
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password!, 5);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);
