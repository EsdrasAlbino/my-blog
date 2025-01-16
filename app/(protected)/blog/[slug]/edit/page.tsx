"use client";
import { FormsPost } from "@/components/complexUI/formsPost/FormsPost";
import { Post } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";



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
