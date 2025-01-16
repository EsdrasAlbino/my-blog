"use client";

import { wordsTranslate } from "@/lib/translate";
import { Alert, Box, Button, Snackbar, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";

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
        variant="filled"
        error={!!errors[key]}
        helperText={errors[key]?.message}
      />
    );
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        maxWidth: 400,
        margin: "auto",
        padding: 2,
      }}
    >
      <Snackbar open={openError} autoHideDuration={4000} onClose={handleError}>
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
        <Stack style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
  );
};
