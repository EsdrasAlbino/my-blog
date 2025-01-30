import { useRouter } from "next/navigation";
import React, { FC, JSX, useContext } from "react";
import { SessionContext } from "next-auth/react";

type withAuthenticationFn = (Component: FC) => FC;

const withAuthentication: withAuthenticationFn = (Component) => {
  const Authenticated: FC = (): JSX.Element | null => {
    const router = useRouter();
    try {
      const router = useRouter();
      const sessionContext = useContext(SessionContext);

      if (!sessionContext) {
        throw new Error("Session context is undefined");
      }

      const { status } = sessionContext;

      if (status === "loading") {
        throw new Error("Session context is loading");
      }

      console.log("status", status);

      if (status === "unauthenticated") {
        router.push("/");
      }
    } catch (e) {
      router.push("/");
    }

    return <Component />;
  };

  return Authenticated;
};

export { withAuthentication };
