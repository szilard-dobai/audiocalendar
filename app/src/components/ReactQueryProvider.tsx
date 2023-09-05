import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient({
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
});

const ReactQueryProvider = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default ReactQueryProvider;
