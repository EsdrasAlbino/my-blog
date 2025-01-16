"use client";
import AppAppBar from "@/components/AppBar";
import { FormsComponent } from "@/components/template/FormsComponent";
import { User } from "@/lib/types";
import { SessionContext } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export const FormsPost = ({
  titlePage,
  buttonText,
  formsValues,
  postId,
}: {
  titlePage: string;
  buttonText: string;
  formsValues?: { [key: string]: string | boolean };
  postId?: string;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const session = useContext(SessionContext);
  const data = session?.data;

  useEffect(() => {
    getUserLocal();
  }, [data?.user?.email]);

  const formsValuesLocal = formsValues || {
    title: "",
    content: "",
    images: "",
    published: true,
  };

  const getUserLocal = async () => {
    try {
      const email = data?.user?.email;

      const response = await fetch("/api/users?email=" + email);
      const user = await response.json();
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  async function onSubmitPatch(data: typeof formsValues) {
    setIsLoading(true);
    const dataSend = {
      ...data,
      id: postId,
    };
    console.log("dataSend", dataSend);
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

      setOpenSuccess(true);
    } catch (error) {
      setOpenError(true);
      console.error(error);
    }finally{
      setIsLoading(false);
    }
  }

  async function onSubmitPost(data: typeof formsValues) {
    setIsLoading(true);
    const dataSend = {
      ...data,
      authorId: user?.id ?? "",
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

      setOpenSuccess(true);
    } catch (error) {
      setOpenError(true);
      console.error(error);
    }finally{
      setIsLoading(false);
    }
  }

  async function onSubmit(data: typeof formsValues) {
    if (titlePage.includes("Edite")) {
      onSubmitPatch(data);
    } else {
      onSubmitPost(data);
    }
  }

  const handleClose = () => {
    setOpenError(false);
  };

  const handleSuccess = () => {
    setOpenSuccess(false);
    router.push("/");
  };

  return (
    <>
      <AppAppBar />
      <FormsComponent
        FormValues={formsValuesLocal}
        onSubmit={onSubmit}
        buttonText={buttonText}
        title={titlePage}
        handleError={handleClose}
        openError={openError}
        openSucess={openSuccess}
        handleSucess={handleSuccess}
        messageSuccess="Post criado com sucesso, encaminhando para a página inicial..."
        isLoading={isLoading}
      />
      <></>
    </>
  );
};
