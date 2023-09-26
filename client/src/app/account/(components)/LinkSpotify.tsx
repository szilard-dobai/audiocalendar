"use client";

import Button from "@/components/Button";
import QueryKeys from "@/hooks/queryKeys";
import { createSupabaseClient } from "@/utils/client/supabase";
import { Scopes, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

type Props = {
  isAccessGranted: boolean;
  className?: string;
};

const LinkSpotify = ({ isAccessGranted, className }: Props) => {
  const supabase = createSupabaseClient();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const grantAccess = async () => {
    setIsLoading(true);
    setError(null);

    await SpotifyApi.performUserAuthorization(
      process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      `${window.location.origin}/account`,
      Scopes.userRecents,
      `${window.location.origin}/auth/spotify`
    ).catch((error) => setError(`Oh no! An error occured: ${error.message}`));

    setIsLoading(false);
    queryClient.invalidateQueries({ queryKey: QueryKeys.currentUser() });
  };

  const renderGrantAccess = () => (
    <>
      <p className="mb-3">
        Click the button below to grant{" "}
        <span className="font-semibold text-brand">Audiocalendar</span> access
        to your most recently listened to songs on Spotify.
      </p>

      <Button
        className="ml-auto"
        variant="outline"
        image="spotify"
        disabled={isLoading}
        onClick={grantAccess}
      >
        Authorize Spotify
      </Button>
    </>
  );

  const revokeAccess = async () => {
    setIsLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const response = await supabase
      .from("spotify_tokens")
      .delete()
      .eq("userId", user!.id);

    if (response.error) {
      setError(`Oh no! An error occured: ${response.error.message}`);
    }

    setIsLoading(false);
    queryClient.invalidateQueries({ queryKey: QueryKeys.currentUser() });
  };

  const renderRevokeAccess = () => (
    <>
      <p className="mb-3">
        Click the button below to revoke{" "}
        <span className="font-semibold text-brand">Audiocalendar</span>&apos;s
        access to your Spotify account. For extra security, go to your{" "}
        <Link
          href="https://www.spotify.com/account/apps/"
          target="_blank"
          className="font-semibold hover:underline"
        >
          🔗 Account Settings
        </Link>{" "}
        and remove the app from there too.
      </p>

      <Button
        className="ml-auto"
        variant="outline"
        disabled={isLoading}
        onClick={revokeAccess}
        image="spotify"
      >
        Revoke Access
      </Button>
    </>
  );

  return (
    <div className={className}>
      {isAccessGranted ? renderRevokeAccess() : renderGrantAccess()}
      {error && <p className="text-rose-500 italic">{error}</p>}
    </div>
  );
};

export default LinkSpotify;
