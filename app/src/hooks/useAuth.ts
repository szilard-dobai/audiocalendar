import { Scopes } from "@spotify/web-api-ts-sdk";
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

  return useMutation({
    mutationFn: () =>
      supabase.auth
        .signInWithOAuth({
          provider: "spotify",
          options: {
            scopes: Scopes.userRecents.join(" "),
          },
        })
        .then(({ data, error }) => {
          if (error) {
            throw error;
          }
          return data;
        }),
    retry: false,
  });
};

const useLogout = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      supabase.auth.signOut().then(({ error }) => {
        if (error) {
          throw error;
        }
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["session"] }),
    retry: false,
  });
};

const useSession = () => {
  const supabase = useSupabase();

  return useQuery({
    queryKey: ["session"],
    queryFn: () =>
      supabase.auth.getSession().then(({ data, error }) => {
        if (error) {
          throw error;
        }
        return data.session;
      }),
    retry: false,
  });
};
