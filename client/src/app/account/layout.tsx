"use client";

import QueryClientProvider from "@/components/QueryClientProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { PropsWithChildren } from "react";

const AccountLayout = ({ children }: PropsWithChildren) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <QueryClientProvider>{children}</QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default AccountLayout;
