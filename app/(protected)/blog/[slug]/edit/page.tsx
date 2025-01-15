"use client";
import { FormsPost } from "@/components/complexUI/formsPost/FormsPost";
import { Post } from "@/lib/types";
import { useEffect, useState } from "react";

interface CreatePostProps {
  slug: string;
}

export default function CreatePost({ slug }: CreatePostProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/posts?slug=${slug}`);
      const post = await response.json();
      setPost(post[0]);

      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}

      {!isLoading && post && (
        <FormsPost
          titlePage="Edite um post"
          buttonText="Editar post"
          formsValues={{
            title: post.title,
            content: post.content,
            images: post.image,
            published: true,
            authorId: post.authorId,
          }}
          postId={post.id}
        />
      )}
    </div>
  );
}
