"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import type { PropsWithChildren } from "react";

const AccountLayout = ({ children }: PropsWithChildren) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default AccountLayout;
