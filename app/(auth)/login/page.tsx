import { Metadata } from "next";

import { LoginComponent } from "@/components/LoginComponent";
/* import { Command } from "lucide-react";
 */import Link from "next/link";

export const metadata: Metadata = {
  title: "Autenticação",
  description:
    "Autenticação utilizando Shadcs-ui Next-Auth (Authjs), prisma e Nextjs 13.4+",
};

export default async function Register() {
  return (
    <div className="container relative py-48 md:py-0  h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/*       <AuthButton page="login" />
       */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <LoginComponent />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
