"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import useGrantSpotifyAccess from "@/hooks/useGrantSpotifyAccess";
import useRevokeSpotifyAccess from "@/hooks/useRevokeSpotifyAccess";
import Link from "next/link";
import { useState } from "react";

type Props = {
  isAccessGranted: boolean;
  className?: string;
};

const LinkSpotify = ({ isAccessGranted, className }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const renderGrantAccess = () => (
    <>
      <p className="mb-3 text-primary">
        Click the button below to grant Audiocalendar access to your most
        recently listened to songs on Spotify.
      </p>

      <Button
        className="ml-auto"
        variant="outline"
        image="spotify"
        color="brand"
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
      <p className="mb-3 text-primary">
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
        color="brand"
        disabled={isRevokingAccess}
        onClick={openModal}
        image="spotify"
      >
        Revoke Access
      </Button>
      {!!errorRevokingAccess && (
        <p className="text-rose-500 italic">{errorRevokingAccess}</p>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p className="mb-12">
          Are you sure you want to remove Audiocalendar&apos;s access to your
          Spotify account?
        </p>
        <div className="flex justify-between gap-3">
          <Button variant="outline" onClick={closeModal}>
            No, I&apos;ve changed my mind
          </Button>
          <Button
            disabled={isRevokingAccess}
            onClick={() => {
              revokeAccess();
              closeModal();
            }}
          >
            Yes, I&apos;m sure
          </Button>
        </div>
      </Modal>
    </>
  );

  return (
    <div className={className}>
      <h1 className="text-lg font-semibold text-primary">Spotify</h1>

      {isAccessGranted ? renderRevokeAccess() : renderGrantAccess()}
    </div>
  );
};

export default LinkSpotify;
