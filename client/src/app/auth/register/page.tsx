"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { createSupabaseClient } from "@/utils/client/supabase";
import type { AuthResponse, OAuthResponse } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import google from "../../../../public/google.svg";
import spotify from "../../../../public/spotify.svg";

const Register = () => {
  const supabase = createSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wrapAsync = async <T extends AuthResponse | OAuthResponse>(
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

  const handleEmailRegister = () =>
    wrapAsync(
      supabase.auth.signUp({
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleEmailRegister();
  };

  return (
    <div className="flex flex-col items-start">
      <hgroup className="mb-12">
        <h1 className="text-2xl font-bold text-primary">Register</h1>
        <p className="text-secondary">
          Please enter an email and password below, or use a social login.
        </p>
      </hgroup>

      <div className="flex gap-3 mb-6">
        <Button
          className="flex items-center"
          variant="outline"
          disabled={isLoading}
          onClick={() => handleProviderLogin("google")}
        >
          <Image src={google} alt="Google Logo" className="inline w-8 mr-2" />
          Sign up with Google
        </Button>
        <Button
          className="flex items-center"
          variant="outline"
          disabled={isLoading}
          onClick={() => handleProviderLogin("spotify")}
        >
          <Image src={spotify} alt="Spotify Logo" className="inline w-8 mr-2" />
          Sign up with Spotify
        </Button>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
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
          type="submit"
          disabled={isLoading || !password || !email}
        >
          Sign up
        </Button>
      </form>

      <Link
        className="text-secondary hover:underline text-sm"
        href="/auth/login"
      >
        Already have an account? Login!
      </Link>
    </div>
  );
};

export default Register;
