import { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { Session } from "@supabase/supabase-js";
import { createContext, useMemo, type PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";

type SpotifyContextType = SpotifyApi | null;

export const SpotifyContext = createContext<SpotifyContextType>(null);

const createSpotifyClient = (session: Session | null | undefined) => {
  if (!session) {
    return null;
  }

  const client = SpotifyApi.withAccessToken(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    {
      access_token: session.provider_token,
      refresh_token: session.provider_refresh_token,
    } as AccessToken
    // NOTE: withAccessToken() is typed as requiring additional properties on the argument object but it's not really the case
  );

  return client;
};

const SpotifyProvider = ({ children }: PropsWithChildren) => {
  const { session } = useAuth();
  const spotify = useMemo(() => createSpotifyClient(session), [session]);
  return (
    <SpotifyContext.Provider value={spotify}>
      {children}
    </SpotifyContext.Provider>
  );
};

export default SpotifyProvider;
