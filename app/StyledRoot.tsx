"use client";
import { theme } from "@/lib/designSystem";
import { ThemeProvider } from "@mui/material/styles";
import { SessionContext } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export function StyledRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const sessionContext = useContext(SessionContext);

  if (!sessionContext) {
    return <div>Error: Session context is undefined</div>;
  }

  const { status } = sessionContext;

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if(status === "unauthenticated") {
    router.push("/");
  }

  return (
    <>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>;
    </>
  );
}
