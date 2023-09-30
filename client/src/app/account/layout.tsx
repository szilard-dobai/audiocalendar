"use client";

import QueryClientProvider from "@/components/QueryClientProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { PropsWithChildren } from "react";
import Menu from "./(components)/Menu";

const AccountLayout = ({ children }: PropsWithChildren) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <QueryClientProvider>
        <Menu />
        {children}
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default AccountLayout;
