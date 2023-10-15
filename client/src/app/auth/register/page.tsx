"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import useRegister from "@/hooks/useRegister";
import google from "@public/google.svg";
import spotify from "@public/spotify.svg";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync: register, isLoading, error } = useRegister();

  const handleRegister = async (provider?: "google" | "spotify") => {
    const data = await (provider
      ? register({ provider })
      : register({ email, password }));
    window.location.replace("url" in data ? data.url : "/account");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleRegister();
  };

  return (
    <div className="flex flex-col items-start">
      <hgroup className="mb-12">
        <h1 className="text-2xl font-bold text-primary">Register</h1>
        <p className="text-secondary">
          Please enter an email and password below, or use a social login.
        </p>
      </hgroup>

      <div className="flex gap-3 mb-6 flex-wrap">
        <Button
          className="flex items-center"
          variant="outline"
          disabled={isLoading}
          onClick={() => handleRegister("google")}
        >
          <Image src={google} alt="Google Logo" className="inline w-8 mr-2" />
          Sign up with Google
        </Button>
        <Button
          className="flex items-center"
          variant="outline"
          disabled={isLoading}
          onClick={() => handleRegister("spotify")}
        >
          <Image src={spotify} alt="Spotify Logo" className="inline w-8 mr-2" />
          Sign up with Spotify
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
