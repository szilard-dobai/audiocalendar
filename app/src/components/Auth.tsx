import { PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";

const Auth = ({ children }: PropsWithChildren) => {
  const { login, status } = useAuth();

  if (status === "loading") {
    return <>Loading</>;
  }

  if (status === "unauthenticated") {
    return <button onClick={() => login()}>Login</button>;
  }

  return <>{children}</>;
};

export default Auth;
