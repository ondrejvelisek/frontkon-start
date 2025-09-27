export type Post = {
  id: string;
  title: string;
  body: string;
};

export async function getPosts(): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  return (await response.json()) as Post[];
}

export async function getPost(id: string): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post = (await response.json()) as Post;
  post.title = id + ": Post " + new Date().toISOString();
  return post;
}
