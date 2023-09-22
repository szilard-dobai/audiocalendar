"use client";

import { Database } from "@audiocalendar/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const AuthForm = () => {
  const supabase = createClientComponentClient<Database>();

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="light"
    //   showLinks={false}
    //   view="sign_up"
      providers={[]}
      redirectTo={`${window.location.origin}/auth/callback`}
    />
  );
};

export default AuthForm;
