"use client";

import { useState } from "react";
import { FormsComponent } from "./template/FormsComponent";
import { useRouter } from "next/navigation";
import { Alert, Snackbar } from "@mui/material";

const formsValues = {
  username: "",
  email: "",
  password: "",
};

export const RegisterComponent = () => {
  const [data, setData] = useState<typeof formsValues>(formsValues);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(data: typeof formsValues) {
    setIsLoading(true);

    const sendData = {
      name: data.username,
      email: data.email,
      password: data.password,
    }

    const request = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "applicaition/json",
      },
      body: JSON.stringify(sendData),
    });


    if (!request.ok) {
      setOpen(true);
    } else {
      router.push("/login");
    }

    setData(formsValues);
    setIsLoading(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
      <FormsComponent
        title="Registro"
        FormValues={formsValues}
        buttonText="Register"
        onSubmit={onSubmit}
      />
    </>
  );
};
