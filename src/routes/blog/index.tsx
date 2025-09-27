import { getPost, getPosts } from "@/postsClient";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/")({
  component: Blog,
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
  return (
    <>
      Blog page
      <Link to="/blog/$postId" params={{ postId: "1" }}>
        Post 1
      </Link>
    </>
  );
}
