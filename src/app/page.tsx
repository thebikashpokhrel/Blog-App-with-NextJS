import { fetchPosts } from "./actions/server";
import "./globals.css";

export default async function Home() {
  const posts = await fetchPosts();
  console.log(posts);
  return <div>Hello world</div>;
}
