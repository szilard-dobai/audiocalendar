"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { createSupabaseClient } from "@/utils/client/supabase";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const ForgotPassword = () => {
  const supabase = createSupabaseClient();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setSuccess(null);
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
    });
    setIsLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    setSuccess("Email sent! Please check your inbox.");
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
          className="mb-4 w-1/3"
          id="email"
          label="E-Mail"
          type="text"
          placeholder="example@mail.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {error && <p className="text-rose-500 font-semibold mb-6">{error}</p>}
        {success && <p className="text-brand font-semibold mb-6">{success}</p>}

        <Button className="mb-4" type="submit" disabled={isLoading || !email}>
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
