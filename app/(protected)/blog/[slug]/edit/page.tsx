"use client";
import { FormsPost } from "@/components/complexUI/formsPost/FormsPost";
import { Post } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SessionContext } from "next-auth/react";

export default function CreatePost() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [post, setPost] = useState<Post | null>(null);
  const { slug } = useParams();

  console.log("slug", slug);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/posts/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const post = await response.json();
      console.log("post", post);
      setPost(post);

      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const router = useRouter();
  const sessionContext = useContext(SessionContext);

  if (!sessionContext) {
    return <div>Error: Session context is undefined</div>;
  }

  const { status } = sessionContext;

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  console.log("status", status);

  if (status === "unauthenticated") {
    router.push("/");
  }

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
