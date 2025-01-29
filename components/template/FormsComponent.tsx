"use client";

import { openai } from "@/lib/openai";
import { wordsTranslate } from "@/lib/translate";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
  isAi?: boolean;
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

type ComponentMap = {
  [key: string]: typeof TextField | any;
};

const componentMapping: ComponentMap = {
  text: TextField,
  email: TextField,
  password: TextField,
  content: TextField,
  // Add more components as needed
};

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
  isAi,
}: IFormsProps<T>) => {
  const form = useForm<typeof FormValues>({
    // @ts-ignore
    defaultValues: FormValues,
  });

  const [suggestions, setSuggestions] = useState<Record<string, string>>({
    title: "",
    content: "",
  });
  const [isLoadingAi, setIsLoadingAi] = useState<Record<string, boolean>>({
    title: false,
    content: false,
  });

  const { register, handleSubmit, formState, getValues } = form;
  const { errors } = formState;

  const getSuggestion = async (field: keyof FormValues) => {
    try {
      setIsLoadingAi((prev) => ({ ...prev, [field]: true }));

      console.log("FormValues", getValues());

      const prompt =
        field === "title"
          ? `Sugira alguns títulos baseado nesse conteudo: ${getValues(
              "content"
            )}`
          : `Seguira alguns conteudos relevantes baseados nesse título: ${getValues(
              "title"
            )}`;

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
      setIsLoadingAi((prev) => ({ ...prev, [field]: false }));
    }
  };

  const inputs = Object.keys(FormValues).map((key) => {
    const Component = componentMapping[key] || TextField;

    return (
      <>
        <Component
          key={key}
          label={wordsTranslate[key] || key}
          type={key}
          // @ts-ignore
          {...register(key, {
            required: `${key} is required`,
          })}
          variant="outlined"
          error={!!errors[key]}
          // @ts-ignore
          helperText={errors[key]?.message}
          multiline={key == "content"}
          rows={key == "content" ? 4 : 1}
        />
        {suggestions.title && key == "title" && (
          <>
            <Typography>{suggestions.title}</Typography>
          </>
        )}
        {suggestions.content && key == "content" && (
          <Typography>{suggestions.content}</Typography>
        )}

        {isLoadingAi.title && key == "title" && (
          <CircularProgress
            style={{
              alignSelf: "center",
            }}
          />
        )}

        {isLoadingAi.content && key == "content" && (
          <CircularProgress
            style={{
              alignSelf: "center",
            }}
          />
        )}
      </>
    );
  });

  return (
    <SignInContainer>
      <Card
        sx={{
          maxHeight: "80vh", // Set maximum height relative to viewport
          overflow: "auto", // Enable scrolling
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
            "&:hover": {
              background: "#555",
            },
          },
        }}
      >
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
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
            })}
          >
            <Stack
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              {inputs}
              {isAi && (
                <Button
                  onClick={() => {
                    getSuggestion("title");
                    getSuggestion("content");
                  }}
                >
                  Sugestão ai
                </Button>
              )}

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
