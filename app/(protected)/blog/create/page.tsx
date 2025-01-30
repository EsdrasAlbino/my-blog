"use client";
import { FormsPost } from "@/components/complexUI/formsPost/FormsPost";
import { SessionContext } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function CreatePost() {
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

  if(status === "unauthenticated") {
    router.push("/");
  }

  return (
    <div>
      <FormsPost titlePage="Crie um post" buttonText="Criar post" />
    </div>
  );
}
