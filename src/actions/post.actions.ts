"use server";

import { dbConnect } from "@/database/dbConfig";
import { Post } from "@/models/post.model";
import { postType } from "@/schemas/post.schema";
import { revalidatePath } from "next/cache";

export async function fetchPosts() {
  try {
    await dbConnect();
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.log("Error fetching posts", error);
  }
}

export async function createPostAction(post: postType) {
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
    console.log(error.message);
    return {
      success: false,
      message: "Error occurred while creating a new post",
    };
  }
}
