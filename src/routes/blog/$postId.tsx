import { getPost, getPosts } from "@/postsClient";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/blog/$postId")({
  component: BlogPost,
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    await queryClient.ensureQueryData(postsQuery);
  },
});

function BlogPost() {
  return <div />;
}

const postQuery = (postId: string) => ({
  queryKey: ["posts", postId],
  queryFn: () => getPost(postId),
});

const readTimeQuery = (postId: string) => ({
  queryKey: ["posts", postId],
  queryFn: () => getPost(postId),
});

function PostContent() {
  const { postId } = Route.useParams();
  const post = useSuspenseQuery({
    queryKey: ["posts", postId],
    queryFn: () => getPost(postId),
  });
  return <>{post.data.title}</>;
}

const getReadTime = (postId: string) => {};
