import { getPost, getPosts } from "@/postsClient";
import { useSuspenseQuery, type QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/blog/$postId")({
  component: BlogPost,
  loader: async ({ context, params }) => {
    const postId = params.postId;
    const ctx = context as { queryClient: QueryClient };
    const queryClient = ctx.queryClient;
    queryClient.prefetchQuery(postQuery(postId));
  },
});

function BlogPost() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostContent />
    </Suspense>
  );
}

const postQuery = (postId: string) =>
  ({
    queryKey: ["posts", postId],
    queryFn: () => getPost(postId),
    refetchOnMount: "always",
  }) as const;

function PostContent() {
  const { postId } = Route.useParams();
  const post = useSuspenseQuery(postQuery(postId));
  return <>{post.data.title}</>;
}
