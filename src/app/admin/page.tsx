import React from "react";
import { createPostType } from "@/schemas/post.schema";
import { fetchPosts } from "@/server-utils/post.utils";

export default async function adminPage() {
  const response = await fetchPosts();
  const posts = response.data?.posts;
  return (
    <div>
      {posts?.map((post: createPostType) => (
        <h1 key={post.slug}>{post.title}</h1>
      ))}
    </div>
  );
}
