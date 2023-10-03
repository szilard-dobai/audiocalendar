"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { createSupabaseClient } from "@/utils/client/supabase";
import { useState } from "react";

const ResetPassword = () => {
  const supabase = createSupabaseClient();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setError(null);
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setIsLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    window.location.replace("/account");
  };

  return (
    <div className="flex flex-col items-start">
      <hgroup className="mb-12">
        <h1 className="text-2xl font-bold text-primary">
          Create a New Password
        </h1>
        <p className="text-secondary">Please enter your new password below.</p>
      </hgroup>

      <TextInput
        className="mb-12 w-full max-w-xs"
        id="password"
        label="Password"
        type="password"
        placeholder="**********"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {error && <p className="text-rose-500 font-semibold mb-6">{error}</p>}

      <Button onClick={handleClick} disabled={isLoading || !password}>
        Submit
      </Button>
    </div>
  );
};

export default ResetPassword;
