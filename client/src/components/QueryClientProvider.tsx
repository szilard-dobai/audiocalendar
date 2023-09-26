"use client";

import {
  QueryClient,
  QueryClientProvider as RQProvider,
} from "@tanstack/react-query";
import { useState, type PropsWithChildren } from "react";

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1 * 60 * 1000, // 1 minute
            cacheTime: 14 * 24 * 60 * 60 * 1000, // 2 weeks
            refetchOnWindowFocus: true,
            refetchOnReconnect: "always",
            refetchOnMount: true,
            keepPreviousData: true,
          },
        },
      })
  );

  return <RQProvider client={queryClient}>{children}</RQProvider>;
};

export default QueryClientProvider;
