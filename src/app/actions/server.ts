import { dbConnect } from "@/database/dbConfig";
import { Post } from "@/models/models.exports";

export const fetchPosts = async function () {
  try {
    await dbConnect();
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.log("Error fetching posts", error);
  }
};
