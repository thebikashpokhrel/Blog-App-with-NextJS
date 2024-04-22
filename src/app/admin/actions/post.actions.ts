"use server";

import { dbConnect } from "@/database/dbConfig";
import { Post } from "@/models/post.model";
import { redirect } from "next/navigation";

export async function createPostAction(formdata: FormData) {
  try {
    await dbConnect();
    const title = formdata.get("title");
    const content = formdata.get("content");

    const post = await Post.create({
      title,
      content,
      slug: title,
    });

    if (!post) {
      return {
        error: "Cannot create the user",
      };
    }
    redirect("/admin/");
  } catch (error) {
    throw error;
  }
}
