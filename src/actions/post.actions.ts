"use server";

import { dbConnect } from "@/database/dbConfig";
import { Post } from "@/models/post.model";
import { createPostType } from "@/schemas/post.schema";
import { revalidatePath } from "next/cache";

export async function createPostAction(post: createPostType) {
  try {
    await dbConnect();
    const title = post.title;
    const content = post.content;
    const slug = post.slug;

    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return {
        success: false,
        message: "Post with given slug already exists",
        data: { existingPost },
      };
    }

    const createdPost = await Post.create({
      title,
      content,
      slug,
    });

    if (!createdPost) {
      return {
        success: false,
        message: "Cannot create the post",
      };
    }
    revalidatePath("/admin/");
    return {
      success: true,
      message: "Post created succesfully",
      data: { createdPost },
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Error occurred while creating a new post",
      error,
    };
  }
}
