import { getServerSession } from "next-auth";
import { options } from "./auth";

export const getUser = async () => {
  const session = await getServerSession(options);
  return session?.user;
};
