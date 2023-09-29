"use client";

import Button from "@/components/Button";
import useGrantSpotifyAccess from "@/hooks/useGrantSpotifyAccess";
import useRevokeSpotifyAccess from "@/hooks/useRevokeSpotifyAccess";
import Link from "next/link";

type Props = {
  isAccessGranted: boolean;
  className?: string;
};

const LinkSpotify = ({ isAccessGranted, className }: Props) => {
  const {
    mutate: grantAccess,
    isLoading: isGrantingAccess,
    error: errorGrantingAccess,
  } = useGrantSpotifyAccess();
  const {
    mutate: revokeAccess,
    isLoading: isRevokingAccess,
    error: errorRevokingAccess,
  } = useRevokeSpotifyAccess();

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
        disabled={isGrantingAccess}
        onClick={() => grantAccess()}
      >
        Authorize Spotify
      </Button>
      {!!errorGrantingAccess && (
        <p className="text-rose-500 italic">{errorGrantingAccess}</p>
      )}
    </>
  );

  const renderRevokeAccess = () => (
    <>
      <p className="mb-3">
        Click the button below to revoke Audiocalendar&apos;s access to your
        Spotify account. For extra security, go to your{" "}
        <Link
          href="https://www.spotify.com/account/apps/"
          target="_blank"
          className="text-brand font-semibold hover:underline"
        >
          🔗 Account Settings
        </Link>{" "}
        and remove the app from there too.
      </p>

      <Button
        className="ml-auto"
        variant="outline"
        disabled={isRevokingAccess}
        onClick={() => revokeAccess()}
        image="spotify"
      >
        Revoke Access
      </Button>
      {!!errorRevokingAccess && (
        <p className="text-rose-500 italic">{errorRevokingAccess}</p>
      )}
    </>
  );

  return (
    <div className={className}>
      {isAccessGranted ? renderRevokeAccess() : renderGrantAccess()}
    </div>
  );
};

export default LinkSpotify;
