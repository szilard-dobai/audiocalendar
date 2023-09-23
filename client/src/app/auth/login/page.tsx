"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { createSupabaseClient } from "@/utils/client/supabase";
import type { AuthTokenResponse, OAuthResponse } from "@supabase/supabase-js";
import Image from "next/image";
import { useState } from "react";
import google from "../../../../public/google.svg";
import spotify from "../../../../public/spotify.svg";
import Link from "next/link";

const Login = () => {
  const supabase = createSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wrapAsync = async <T extends AuthTokenResponse | OAuthResponse>(
    promise: Promise<T>
  ) => {
    setError(null);
    setIsLoading(true);
    const { data, error } = await promise;
    setIsLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    window.location.replace("url" in data ? data.url : "/account");
  };

  const handleEmailLogin = async () =>
    wrapAsync(
      supabase.auth.signInWithPassword({
        email,
        password,
      })
    );

  const handleProviderLogin = (provider: "google" | "spotify") =>
    wrapAsync(
      supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
    );

  return (
    <div className="flex flex-col items-start">
      <hgroup className="mb-12">
        <h1 className="text-2xl font-bold text-primary">Log In</h1>
        <p className="text-secondary">
          Please enter your email and password below, or use a social login.
        </p>
      </hgroup>

      <div className="flex gap-3 mb-6">
        <Button
          className="flex items-center"
          variant="outline"
          disabled={isLoading}
          onClick={() => handleProviderLogin("google")}
        >
          <Image src={google} alt="Google" className="inline w-8 mr-2" />
          Sign in with Google
        </Button>
        <Button
          className="flex items-center"
          variant="outline"
          disabled={isLoading}
          onClick={() => handleProviderLogin("spotify")}
        >
          <Image src={spotify} alt="Spotify" className="inline w-8 mr-2" />
          Sign in with Spotify
        </Button>
      </div>

      <TextInput
        className="mb-4 w-1/3"
        id="email"
        label="E-Mail"
        type="text"
        placeholder="example@mail.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextInput
        className="mb-12 w-1/3"
        id="password"
        label="Password"
        type="password"
        placeholder="**********"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {error && <p className="text-rose-500 font-semibold mb-6">{error}</p>}

      <Button
        className="mb-4"
        onClick={handleEmailLogin}
        disabled={isLoading || !password || !email}
      >
        Log in
      </Button>

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
