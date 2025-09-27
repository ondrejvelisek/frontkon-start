import { getPost } from "@/postsClient";
import { useSuspenseQuery, type QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { createIsomorphicFn } from "@tanstack/react-start";

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

const getEnvPrerender = createIsomorphicFn()
  .server(() => process.env.PRERENDER ?? "Server")
  .client(() => "Client");

const postQuery = (postId: string) =>
  ({
    queryKey: ["posts", postId],
    queryFn: async () => {
      if (getEnvPrerender() === "Ano") {
        return "loading";
      }
      return await getPost(postId);
    },
    refetchOnMount: "always",
  }) as const;

function PostContent() {
  const { postId } = Route.useParams();
  const post = useSuspenseQuery(postQuery(postId));
  if (post.data === "loading") {
    return <div id="loading-on-prerender">Loading on prerender...</div>;
  }
  return <div id="post-content">{post.data.title}</div>;
}
