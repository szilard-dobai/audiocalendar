"use client";

import Button from "@/components/Button";
import { createSupabaseClient } from "@/utils/client/supabase";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import google from "../../../../public/google.svg";

const AuthorizeGoogleButton = () => {
  const supabase = createSupabaseClient();
  const authorizeGoogle = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar",
    flow: "auth-code",
    onSuccess: (response) =>
      supabase.functions.invoke("setup-google", {
        body: JSON.stringify({
          ...response,
          redirectUri: window.location.origin,
        }),
      }),
  });
  return (
    <Button
      className="flex items-center"
      variant="outline"
      onClick={authorizeGoogle}
    >
      <Image src={google} alt="Google" className="inline w-8 mr-2" />
      Authorize Google
    </Button>
  );
};

export default AuthorizeGoogleButton;
