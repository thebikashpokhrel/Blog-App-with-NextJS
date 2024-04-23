import React from "react";
import { fetchPosts } from "@/actions/post.actions";
import { postType } from "@/schemas/post.schema";

export default async function adminPage() {
  const posts = await fetchPosts();
  return (
    <div>
      {posts?.map((post: postType) => (
        <h1 key={post.slug}>{post.title}</h1>
      ))}
    </div>
  );
}
