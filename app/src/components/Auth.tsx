import { PropsWithChildren, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Auth = ({ children }: PropsWithChildren) => {
  const { login, status } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  if (status === "loading") {
    return <>Loading</>;
  }

  if (status === "unauthenticated") {
    return (
      <form>
        <label htmlFor="email">E-Mail</label>
        <input
          id="email"
          title="E-Mail"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          title="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <button type="button" onClick={() => login(form)}>
          Log in
        </button>
      </form>
    );
  }

  return <>{children}</>;
};

export default Auth;
