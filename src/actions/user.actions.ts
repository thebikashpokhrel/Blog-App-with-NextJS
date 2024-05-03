"use server";

import * as jose from "jose";
import { dbConnect } from "@/database/dbConfig";
import { User } from "@/models/user.model";
import { SignInSchema, SignUpSchema } from "@/schemas/user.schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpAction(user: any) {
  try {
    const validatedUserData = SignUpSchema.safeParse(user);
    if (!validatedUserData.success) {
      return {
        success: false,
        message: "Invalid user data",
      };
    }

    await dbConnect();
    const { firstname, lastname, username, password, email } =
      validatedUserData.data;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return {
        success: false,
        message: "Username already exists",
      };
    }

    const newUser = new User({
      firstname,
      lastname,
      username,
      password,
      email,
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return {
        success: false,
        message: "Error while signing up",
      };
    }

    return {
      success: true,
      message: "User signed up successfully",
      data: { user: savedUser },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error while signing up",
    };
  }
}

export async function signInAction(user: any) {
  try {
    const validatedUserData = SignInSchema.safeParse(user);
    if (!validatedUserData.success) {
      return {
        success: false,
        message: "Invalid user data",
      };
    }

    await dbConnect();
    const { email, password } = validatedUserData.data;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return {
        success: false,
        message: "User with given email doesn't exist",
      };
    }

    const isPasswordCorrect = existingUser.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    const payload = {
      userId: existingUser._id,
    };

    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const alg = "HS256";

    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error while signing in",
    };
  }

  redirect("/");
}
