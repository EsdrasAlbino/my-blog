"use client";
import { theme } from "@/lib/designSystem";
import { ThemeProvider } from "@mui/material/styles";

export function StyledRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>;
    </>
  );
}
