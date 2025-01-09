"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

type FormValuesType = {
  [key: string]: string;
};

interface IFormsProps {
  FormValues: FormValuesType;
    buttonText: string;
    onSubmit: (data: FormValuesType) => void;
}

export const FormsComponent = ({ FormValues, buttonText, onSubmit }: IFormsProps) => {
  const form = useForm<typeof FormValues>({
    defaultValues: FormValues,
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;


  const inputs = Object.keys(FormValues).map((key) => {
    return (
      <TextField
        key={key}
        label={key}
        type={key}
        {...register(key, {
          required: `${key} is required`,
        })}
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
        border: "1px solid #ccc",
      }}
    >
      <h1 style={{ color: "#000" }}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {inputs}
          <Button type="submit" variant="contained">
            {buttonText}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
