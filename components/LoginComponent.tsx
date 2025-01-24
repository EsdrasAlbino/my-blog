"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormsComponent } from "./template/FormsComponent";

const formsValues = {
  email: "",
  password: "",
};

export const LoginComponent = () => {
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(data: typeof formsValues) {
    setIsLoading(true);

    const res = await signIn<"credentials">("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      setOpenError(true);
    } else {
      setOpenSuccess(true);
      router.push("/");
    }
    setIsLoading(false);
  }

  const handleClose = () => {
    setOpenError(false);
  };

  const handleSuccess = () => {
    setOpenSuccess(false);
  };

  return (
    <FormsComponent
      title="Login"
      FormValues={formsValues}
      buttonText="Login"
      // @ts-ignore
      onSubmit={onSubmit}
      openError={openError}
      handleError={handleClose}
      openSucess={openSuccess}
      handleSuccess={handleSuccess}
      isLoading={isLoading}
    />
  );
};
