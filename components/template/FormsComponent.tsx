"use client";

import { wordsTranslate } from "@/lib/translate";
import {
  Alert,
  Box,
  Button,
  FormLabel,
  Snackbar,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import MuiCard from "@mui/material/Card";

interface IFormsProps<T> {
  FormValues: T;
  buttonText: string;
  onSubmit: (data: T) => Promise<void>;
  title: string;
  handleError: () => void;
  openError: boolean;
  messageSuccess?: string;
  messageError?: string;
  openSucess: boolean;
  handleSucess: () => void;
  isLoading: boolean;
}

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export const FormsComponent = <T extends Record<string, string>>({
  FormValues,
  buttonText,
  onSubmit,
  title,
  handleError,
  openError,
  messageSuccess,
  messageError,
  openSucess,
  handleSucess,
  isLoading,
}: IFormsProps<T>) => {
  const form = useForm<typeof FormValues>({
    defaultValues: FormValues,
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const inputs = Object.keys(FormValues).map((key) => {
    return (
      <TextField
        key={key}
        label={wordsTranslate[key] || key}
        type={key}
        {...register(key, {
          required: `${key} is required`,
        })}
        variant="outlined"
        error={!!errors[key]}
        helperText={errors[key]?.message}
      />
    );
  });

  return (
    <SignInContainer>
      <Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <Snackbar
            open={openError}
            autoHideDuration={4000}
            onClose={handleError}
          >
            <Alert
              onClose={handleError}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {messageError ?? "Erro!"}
            </Alert>
          </Snackbar>

          <Snackbar
            open={openSucess}
            autoHideDuration={4000}
            onClose={handleSucess}
          >
            <Alert
              onClose={handleSucess}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {messageSuccess ?? "Sucesso!"}
            </Alert>
          </Snackbar>
          <h1 style={{}}>{title}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              {inputs}
              <Button type="submit" variant="contained">
                {buttonText}
              </Button>
            </Stack>
          </form>
          {isLoading && (
            <CircularProgress
              style={{
                alignSelf: "center",
              }}
            />
          )}
        </Box>
      </Card>
    </SignInContainer>
  );
};
