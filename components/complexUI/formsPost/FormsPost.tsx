"use client";
import AppAppBar from "@/components/AppBar";
import { FormsComponent } from "@/components/template/FormsComponent";
import { openai } from "@/lib/openai";
import { User } from "@/lib/types";
import { get } from "http";
import { SessionContext } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface FormValues {
  title: string;
  content: string;
  images: string;
  published: boolean;
}

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

  const [formsValuesLocal, setFormsValuesLocal] = useState<FormValues>({
    title: "",
    content: "",
    images: "",
    published: true,
  });
  const [suggestions, setSuggestions] = useState<FormValues>({
    title: "",
    content: "",
    images: "",
    published: true,
  });
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({
    title: false,
    content: false,
  });

  const router = useRouter();

  const session = useContext(SessionContext);
  const data = session?.data;

  useEffect(() => {
    getUserLocal();
  }, [data?.user?.email]);

  /*   const formsValuesLocal = formsValues || {
    title: "",
    content: "",
    images: "",
    published: true,
  }; */

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
    setIsLoading((prev) => ({ ...prev, global: true }));
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
    } finally {
      setIsLoading((prev) => ({ ...prev, global: false }));
    }
  }

  async function onSubmitPost(data: typeof formsValues) {
    setIsLoading((prev) => ({ ...prev, global: true }));
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
    } finally {
      setIsLoading((prev) => ({ ...prev, global: false }));
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

  const getSuggestion = async (field: keyof FormValues) => {
    try {
      setIsLoading((prev) => ({ ...prev, [field]: true }));

      const prompt =
        field === "title"
          ? `Suggest a catchy title based on this content: ${formsValuesLocal.content}`
          : `Suggest relevant content based on this title: ${formsValuesLocal.title}`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const suggestion = response.choices[0]?.message?.content || "";
      setSuggestions((prev) => ({
        ...prev,
        [field]: suggestion,
      }));
    } catch (error) {
      console.error("Error getting suggestion:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [field]: false }));
    }
  };

  return (
    <>
      <AppAppBar />
      <FormsComponent
        // @ts-ignore
        FormValues={formsValuesLocal}
        onSubmit={onSubmit}
        buttonText={buttonText}
        title={titlePage}
        handleError={handleClose}
        openError={openError}
        openSucess={openSuccess}
        handleSucess={handleSuccess}
        messageSuccess="Post criado com sucesso, encaminhando para a página inicial..."
        isLoading={isLoading.title || isLoading.content}
      />
      <div>
        <div>
          <input
            type="text"
            value={formsValuesLocal.title}
            onChange={(e) =>
              setFormsValuesLocal((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className="w-full p-2 border rounded"
            placeholder="Enter title"
          />
          {isLoading.title && (
            <p className="text-sm text-gray-500">Getting suggestion...</p>
          )}
          {suggestions.title && (
            <p className="text-sm text-blue-600">
              Suggestion: {suggestions.title}
            </p>
          )}
        </div>
        <div>
          <textarea
            value={formsValuesLocal.content}
            onChange={(e) =>
              setFormsValuesLocal((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
            className="w-full p-2 border rounded"
            placeholder="Enter content"
            rows={4}
          />
          {isLoading.content && (
            <p className="text-sm text-gray-500">Getting suggestion...</p>
          )}
          {suggestions.content && (
            <p className="text-sm text-blue-600">
              Suggestion: {suggestions.content}
            </p>
          )}
        </div>
        <button
          onClick={() => {
            getSuggestion("title");
            getSuggestion("content");
          }}
        >
          Sugestão ai
        </button>
      </div>
      <></>
    </>
  );
};
