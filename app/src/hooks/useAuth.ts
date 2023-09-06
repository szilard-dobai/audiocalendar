import { Scopes } from "@spotify/web-api-ts-sdk";
import { Session } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
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
  useUpdateTokens();

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
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "spotify",
        options: {
          scopes: Scopes.userRecents.join(" "),
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        throw error;
      }
      return data;
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

const useUpdateTokens = () => {
  const supabase = useSupabase();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === "SIGNED_IN") {
        void supabase
          .from("spotify_tokens")
          .upsert(
            {
              userId: session.user.id,
              accessToken: session.provider_token,
              refreshToken: session.provider_refresh_token,
              expiresAt: session.expires_at,
              expiresIn: session.expires_in,
            },
            { onConflict: "userId" }
          )
          // NOTE: without this then(), the call doesn't get made. If I make it async&await, execution stops and app is stuck in 'Loading'
          .then(() => console.log("Set tokens!"));
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);
};
