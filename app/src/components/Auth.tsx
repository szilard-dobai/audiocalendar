import { type PropsWithChildren, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Auth = ({ children }: PropsWithChildren) => {
  const {
    loginMutation: { mutate: login, error: loginError, isLoading: isLoggingIn },
    registerMutation: {
      mutate: register,
      error: registerError,
      isLoading: isRegistering,
    },
    status,
  } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const isLoading = isLoggingIn || isRegistering;
  const error = loginError || registerError || "";

  if (status === "loading") {
    return <>Loading</>;
  }

  if (status === "unauthenticated") {
    return (
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "200px",
          margin: "0 auto",
        }}
        onSubmit={(event) => {
          event.preventDefault();
          login(form);
        }}
      >
        {!!error && <p style={{ color: "red" }}>{error as string}</p>}
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

        <button type="submit" disabled={isLoading}>
          Log in
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => register(form)}
        >
          Register
        </button>
      </form>
    );
  }

  return <>{children}</>;
};

export default Auth;
