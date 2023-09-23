"use client";

import Button from "@/components/Button";
import { Scopes, SpotifyApi } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import { useState } from "react";
import spotify from "../../../../public/spotify.svg";

const AuthorizeSpotifyButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await SpotifyApi.performUserAuthorization(
      process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      `${window.location.origin}/account`,
      Scopes.userRecents,
      `${window.location.origin}/auth/spotify`
    );
    setIsLoading(false);
  };

  return (
    <Button
      className="flex items-center"
      variant="outline"
      disabled={isLoading}
      onClick={handleClick}
    >
      <Image src={spotify} alt="Spotify Logo" className="inline w-8 mr-2" />
      Authorize Spotify
    </Button>
  );
};

export default AuthorizeSpotifyButton;
