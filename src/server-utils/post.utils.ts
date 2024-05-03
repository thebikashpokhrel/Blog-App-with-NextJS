import { dbConnect } from "@/database/dbConfig";
import { Post } from "@/models/post.model";

export async function fetchPosts() {
  try {
    await dbConnect();
    const posts = await Post.find();
    return {
      success: true,
      message: "Posts fetched successfully",
      data: { posts },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error occurred fetching posts",
      error,
    };
  }
}
