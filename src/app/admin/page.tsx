import React from "react";
import { fetchPosts } from "@/actions/post.actions";
import { postType } from "@/schemas/post.schema";

export default async function adminPage() {
  const response = await fetchPosts();
  const posts = response.data?.posts;
  return (
    <div>
      {posts?.map((post: postType) => (
        <h1 key={post.slug}>{post.title}</h1>
      ))}
    </div>
  );
}
