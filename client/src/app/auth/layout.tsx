"use client";

import QueryClientProvider from "@/components/QueryClientProvider";
import type { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider>{children}</QueryClientProvider>;
};

export default AuthLayout;
