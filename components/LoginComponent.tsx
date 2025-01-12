"use client";

import { signIn } from "next-auth/react";
import { FormsComponent } from "./template/FormsComponent";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const formsValues = {
  email: "",
  password: "",
};

export const LoginComponent = () => {
  const [data, setData] = useState<typeof formsValues>(formsValues);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(data: typeof formsValues) {
    setIsLoading(true);


    const res = await signIn<"credentials">("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      setOpen(true);
    } else {
      router.push("/");
    }

    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 5000);

    setData(formsValues);
    setIsLoading(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
      <FormsComponent
        title="Login"
        FormValues={formsValues}
        buttonText="Login"
        onSubmit={onSubmit}
      />
    </>
  );
};
