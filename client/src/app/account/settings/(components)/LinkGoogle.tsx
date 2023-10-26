"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Modal from "@/components/Modal";
import useGrantGoogleAccess from "@/hooks/useGrantGoogleAccess";
import useRevokeGoogleAccess from "@/hooks/useRevokeGoogleAccess";
import Link from "next/link";
import { useState } from "react";

type Props = {
  isAccessGranted: boolean;
  className?: string;
};

const LinkGoogle = ({ isAccessGranted, className }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    mutate: grantAccess,
    isLoading: isGrantingAccess,
    error: errorGrantingAccess,
  } = useGrantGoogleAccess();
  const {
    mutate: revokeAccess,
    isLoading: isRevokingAccess,
    error: errorRevokingAccess,
  } = useRevokeGoogleAccess();

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const renderGrantAccess = () => (
    <>
      <p className="mb-3 text-primary">
        Click the button below to grant Audiocalendar access to your Google
        Calendar.
      </p>

      <Button
        className="ml-auto"
        variant="outline"
        image="google"
        color="brand"
        disabled={isGrantingAccess}
        onClick={() => grantAccess()}
      >
        Authorize Google
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
        Google account. For extra security, go to your{" "}
        <Link
          href="https://myaccount.google.com/connections/"
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
        image="google"
      >
        Revoke Access
      </Button>
      {!!errorRevokingAccess && (
        <p className="text-rose-500 italic">{errorRevokingAccess}</p>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p className="mb-12">
          Are you sure you want to remove Audiocalendar&apos;s access to your
          Google account?
        </p>
        <div className="flex flex-col md:flex-row md:justify-between gap-3">
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
      <Heading level={4}>Google Calendar</Heading>

      {isAccessGranted ? renderRevokeAccess() : renderGrantAccess()}
    </div>
  );
};

export default LinkGoogle;
