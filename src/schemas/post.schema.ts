import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string({
      required_error: "Title must be string",
    })
    .trim()
    .min(1, { message: "Please enter the title for the post" })
    .max(200, { message: "Title can not be more than 200 characters long" }),
  content: z.string(),
  slug: z
    .string({
      required_error: "Slug must be string",
    })
    .trim()
    .min(1, { message: "Please enter the unique slug for the post" })
    .max(200, { message: "Slug can not be more than 200 characters long" }),
});

export type postType = z.infer<typeof postSchema>;
