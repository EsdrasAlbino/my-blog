"use client";
import AppAppBar from "@/components/AppBar";
import { FormsComponent } from "@/components/template/FormsComponent";
import { SessionContext } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

export const FormsPost = ({
  titlePage,
  buttonText,
  formsValues,
  postId
}: {
  titlePage: string;
  buttonText: string;
  formsValues?: { [key: string]: string };
  postId?: string;
}) => {
  const [user, setUser] = useState(null);

  const { data } = useContext(SessionContext);

  useEffect(() => {
    getUserLocal();
  }, [data?.user?.email]);
  const formsValuesLocal = formsValues || {
    title: "",
    content: "",
    images: "",
    published: true,
    //authorId: "",
  };

  const getUserLocal = async () => {
    const email = data?.user?.email;
    const response = await fetch("/api/users?email=" + email);
    const user = await response.json();
    setUser(user);
  };

  async function onSubmitPatch(data: typeof formsValues) {
    const dataSend = {
      ...data,
      id: postId,
    }
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update post");
      }

      const result = await response.json();
    } catch (error) {}
  }

  async function onSubmitPost(data: typeof formsValues) {
    const dataSend = {
      ...data,
      authorId: user?.id || "",
    };
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create post");
      }

      const result = await response.json();
    } catch (error) {}
  }

  async function onSubmit(data: typeof formsValues) {
    if(titlePage.includes("Edite")) {
      onSubmitPatch(data);
    }else{
      onSubmitPost(data);
    }
  }

  return (
    <>
      <AppAppBar />
      <FormsComponent
        FormValues={formsValuesLocal}
        onSubmit={onSubmit}
        buttonText={buttonText}
        title={titlePage}
      />
      <></>
    </>
  );
};
