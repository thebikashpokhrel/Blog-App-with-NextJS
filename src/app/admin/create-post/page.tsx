import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import React from "react";
import { createPostAction } from "../actions/post.actions";

export default function createPost() {
  return (
    <form action={createPostAction} className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold mb-4">Create new Post</h1>
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Post title</Label>
        <Input placeholder="Enter post title" name="title" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Post Content</Label>
        <Textarea name="content" placeholder="Start writing..." />
      </div>
      <Button className="w-[100px] mt-2">Create</Button>
    </form>
  );
}
