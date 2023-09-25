"use client";

import Button from "@/components/Button";
import { createSupabaseClient } from "@/utils/client/supabase";
import { useGoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useState } from "react";

type Props = {
  isAccessGranted: boolean;
  className?: string;
};

const LinkGoogle = ({ isAccessGranted, className }: Props) => {
  const supabase = createSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const grantAccess = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar",
    flow: "auth-code",
    onSuccess: async (response) => {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase.functions.invoke("setup-google", {
        body: JSON.stringify({
          ...response,
          redirectUri: window.location.origin,
        }),
      });

      if (error) {
        setError(`Oh no! An error occured: ${error.message}`);
      }

      setIsLoading(false);
    },
  });

  const renderGrantAccess = () => (
    <>
      <p className="mb-3">
        Click the button below to grant{" "}
        <span className="font-semibold text-brand">Audiocalendar</span> access
        to your Google Calendar.
      </p>

      <Button
        className="ml-auto"
        variant="outline"
        image="google"
        disabled={isLoading}
        onClick={grantAccess}
      >
        Authorize Google
      </Button>
    </>
  );

  const revokeAccess = async () => {
    setIsLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const response = await supabase
      .from("google_tokens")
      .delete()
      .eq("userId", user!.id);

    if (response.error) {
      setError(`Oh no! An error occured: ${response.error.message}`);
    }

    setIsLoading(false);
  };

  const renderRevokeAccess = () => (
    <>
      <p className="mb-3">
        Click the button below to revoke{" "}
        <span className="font-semibold text-brand">Audiocalendar</span>&apos;s{" "}
        access to your Google account. For extra security, go to your{" "}
        <Link
          href="https://myaccount.google.com/connections/"
          target="_blank"
          className="font-semibold hover:underline"
        >
          🔗 Account Settings
        </Link>{" "}
        and remove the app from there too.
      </p>

      <Button
        className="ml-auto"
        variant="outline"
        disabled={isLoading}
        onClick={revokeAccess}
        image="google"
      >
        Revoke Access
      </Button>
    </>
  );

  return (
    <div className={className}>
      {isAccessGranted ? renderRevokeAccess() : renderGrantAccess()}
      {error && <p className="text-rose-500 italic">{error}</p>}
    </div>
  );
};

export default LinkGoogle;
