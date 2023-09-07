import { Session } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useSupabase from "./useSupabase";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

const getStatus = (
  session: Session | null | undefined,
  isLoading: boolean
): AuthStatus => {
  if (isLoading) {
    return "loading";
  }
  if (session) {
    return "authenticated";
  }
  return "unauthenticated";
};

export const useAuth = () => {
  const { mutate: login, isLoading: isLoggingIn } = useLogin();
  const { mutate: logout, isLoading: isLoggingOut } = useLogout();
  const { data: session, isLoading: isLoadingSession } = useSession();

  const isLoading = isLoggingIn || isLoggingOut || isLoadingSession;

  return {
    isLoading,
    login,
    logout,
    session,
    status: getStatus(session, isLoading),
  };
};

const useLogin = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: (session) => {
      queryClient.setQueryData(["session"], session);
    },
    retry: false,
  });
};

const useLogout = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["session"] }),
    retry: false,
  });
};

const useSession = () => {
  const supabase = useSupabase();

  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      return data.session;
    },
    retry: false,
  });
};
