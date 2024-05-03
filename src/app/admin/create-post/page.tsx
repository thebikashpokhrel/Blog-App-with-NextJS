"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import React from "react";
import slugify from "slug";
import { createPostAction } from "../../../actions/post.actions";
import toast, { Toaster } from "react-hot-toast";
import { createPostSchema, createPostType } from "@/schemas/post.schema";

export default function createPost() {
  const [post, setPost] = React.useState<createPostType>({} as createPostType);

  const handleCreatePost = async function (formData: FormData) {
    const post = Object.fromEntries(formData);
    const validatedPost = createPostSchema.safeParse(post);

    if (!validatedPost.success) {
      const errors = validatedPost.error.issues;
      toast.dismiss();
      toast.error(errors[0].message);
    } else {
      const response = await createPostAction(validatedPost.data);
      if (!response.success) {
        toast.dismiss();
        toast.error(response.message);
      } else {
        toast.success(response.message);
        setPost({
          title: "",
          slug: "",
          content: "",
        });
      }
    }
  };

  React.useEffect(() => {
    const slug = slugify(post.title || "");
    setPost((prev) => ({ ...prev, slug }));
  }, [post.title]);

  return (
    <form action={handleCreatePost} className="flex flex-col gap-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Create new Post</h1>
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Post title</Label>
        <Input
          placeholder="Enter post title"
          name="title"
          value={post.title}
          onChange={(e) =>
            setPost((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Post Content</Label>
        <Textarea
          name="content"
          placeholder="Start writing..."
          value={post.content}
          onChange={(e) =>
            setPost((prev) => ({ ...prev, content: e.target.value }))
          }
          className="min-h-[250px]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          placeholder="Slug"
          name="slug"
          value={post.slug}
          onChange={(e) =>
            setPost((prev) => ({
              ...prev,
              slug: slugify(e.target.value),
            }))
          }
        />
      </div>
      <Button className="w-[100px] mt-2">Create</Button>
    </form>
  );
}
