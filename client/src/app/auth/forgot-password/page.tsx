"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import useResetPassword from "@/hooks/useResetPassword";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const {
    mutate: resetPassword,
    isPending,
    isSuccess,
    error,
  } = useResetPassword();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    resetPassword({ email });
  };

  return (
    <div className="flex flex-col items-start">
      <hgroup className="mb-12">
        <h1 className="text-2xl font-bold text-primary">Forgot Password</h1>
        <p className="text-secondary">
          Enter your email address below, and we&apos;ll send you an email with
          a link to reset your password.
        </p>
      </hgroup>

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
        {!!error && <p className="text-rose-500 font-semibold mb-6">{error}</p>}
        {isSuccess && (
          <p className="text-brand font-semibold mb-6">
            Email sent! Please check your inbox.
          </p>
        )}

        <Button className="mb-4" type="submit" disabled={isPending || !email}>
          Submit
        </Button>
      </form>

      <Link
        className="text-secondary hover:underline text-sm"
        href="/auth/login"
      >
        Remember your password? Login!
      </Link>
    </div>
  );
};

export default ForgotPassword;
