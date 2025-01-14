"use client";

import { wordsTranslate } from "@/lib/translate";
import { Box, Button, OutlinedInput, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

interface IFormsProps<T> {
  FormValues: T;
  buttonText: string;
  onSubmit: (data: T) => Promise<void>;
  title: string;
}

export const FormsComponent = <T extends Record<string, string>>({
  FormValues,
  buttonText,
  onSubmit,
  title,
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
      <h1 style={{}}>{title}</h1>
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
