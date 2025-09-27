import { getPost, getPosts } from "@/postsClient";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

type BlogSearch = {
  postId: string;
};

export const Route = createFileRoute("/blog/")({
  component: Blog,
  loader: async () => await getPosts(),
});

const postQuery = (postId: string) => ({
  queryKey: ["posts", postId],
  queryFn: () => getPost(postId),
});

const postsQuery = {
  queryKey: ["posts"],
  queryFn: () => getPosts(),
};

function Blog() {
  const { postId } = Route.useParams();
  const posts = useSuspenseQuery(postQuery(postId));
  return null;
}
