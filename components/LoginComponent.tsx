"use client";

import { signIn } from "next-auth/react";
import { FormsComponent } from "./template/FormsComponent";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Stack, styled } from "@mui/material";

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

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
    setData(formsValues);
    setIsLoading(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SignInContainer>
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
    </SignInContainer>
  );
};
