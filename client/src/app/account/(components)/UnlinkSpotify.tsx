"use client";

import Button from "@/components/Button";
import { createSupabaseClient } from "@/utils/client/supabase";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import spotify from "../../../../public/spotify.svg";

type Props = {
  className?: JSX.IntrinsicElements["div"]["className"];
};

const UnlinkSpotify = ({ className }: Props) => {
  const supabase = createSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
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
  };

  return (
    <div className={className}>
      <p className="mb-3">
        Click the button below to revoke Audiocalendar&apos;s access to your
        Spotify account. For extra security, go to your{" "}
        <Link
          href="https://www.spotify.com/account/apps/"
          target="_blank"
          className="font-semibold hover:underline"
        >
          Account Settings
        </Link>{" "}
        and remove Audiocalendar from there too.
      </p>

      <Button
        className="flex items-center ml-auto"
        variant="outline"
        disabled={isLoading}
        onClick={handleClick}
      >
        <Image src={spotify} alt="Spotify Logo" className="inline w-8 mr-2" />
        Revoke Access
      </Button>

      {error && <p className="text-rose-500 italic">{error}</p>}
    </div>
  );
};

export default UnlinkSpotify;
