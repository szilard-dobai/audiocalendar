"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import useLogin from "@/hooks/useLogin";
import google from "@public/google.svg";
import spotify from "@public/spotify.svg";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync: login, isLoading, error } = useLogin();

  const handleLogin = async (provider?: "google" | "spotify") => {
    const data = await (provider
      ? login({ provider })
      : login({ email, password }));
    window.location.replace("url" in data ? data.url : "/account");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex flex-col items-start">
      <hgroup className="mb-12">
        <h1 className="text-2xl font-bold text-primary">Log In</h1>
        <p className="text-secondary">
          Please enter your email and password below, or use a social login.
        </p>
      </hgroup>

      <div className="flex gap-3 mb-6 flex-wrap">
        <Button
          className="flex items-center"
          variant="outline"
          disabled={isLoading}
          onClick={() => handleLogin("google")}
        >
          <Image src={google} alt="Google Logo" className="inline w-8 mr-2" />
          Sign in with Google
        </Button>
        <Button
          className="flex items-center"
          variant="outline"
          disabled={isLoading}
          onClick={() => handleLogin("spotify")}
        >
          <Image src={spotify} alt="Spotify Logo" className="inline w-8 mr-2" />
          Sign in with Spotify
        </Button>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <TextInput
          className="mb-4 max-w-xs"
          id="email"
          label="E-Mail"
          type="text"
          placeholder="example@mail.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextInput
          className="mb-12 max-w-xs"
          id="password"
          label="Password"
          type="password"
          placeholder="**********"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {!!error && <p className="text-rose-500 font-semibold mb-6">{error}</p>}

        <Button
          className="mb-4"
          type="submit"
          disabled={isLoading || !password || !email}
        >
          Log in
        </Button>
      </form>

      <Link
        className="text-secondary hover:underline text-sm"
        href="/auth/register"
      >
        Don&apos;t have an account? Register here!
      </Link>
      <Link
        className="text-secondary hover:underline text-sm"
        href="/auth/forgot-password"
      >
        Forgot your password?
      </Link>
    </div>
  );
};

export default Login;
