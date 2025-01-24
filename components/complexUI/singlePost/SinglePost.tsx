import { Post } from "@/lib/types";

export const SinglePostPage = async ({ post }: { post: Post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};
