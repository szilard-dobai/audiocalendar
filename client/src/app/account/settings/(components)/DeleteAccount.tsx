"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import useDeleteCurrentUser from "@/hooks/useDeleteCurrentUser";
import { useState } from "react";

type Props = {
  email: string;
  className?: string;
};

const DeleteAccount = ({ email, className }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verification, setVerification] = useState("");
  const {
    mutate: deleteAccount,
    isLoading: isDeletingAccount,
    error: errorDeletingAccount,
  } = useDeleteCurrentUser();

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={className}>
      <Heading level={4} className="text-red-500">
        Delete account
      </Heading>

      <p className="mb-3 text-red-500">
        Once you delete your account, there is no going back. Please be certain.
      </p>

      <Button
        className="ml-auto"
        variant="outline"
        color="danger"
        disabled={isDeletingAccount}
        onClick={openModal}
      >
        Delete my account
      </Button>
      {!!errorDeletingAccount && (
        <p className="text-rose-500 italic">{errorDeletingAccount}</p>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p className="mb-3 font-semibold">
          Are you sure you want to delete your Audiocalendar account?
        </p>

        <p className="mb-12">
          This means Audiocalendar will no longer have access to your Spotify
          account, nor your Google Calendar.
          <br />
          Moreover, all of your data will be{" "}
          <span className="font-semibold">wiped forever</span>.
        </p>

        <p>
          Please type your email address below:{" "}
          <span className="select-none font-medium">{email}</span>
        </p>
        <TextInput
          className="mb-12"
          type="text"
          placeholder="Email address"
          value={verification}
          onChange={(event) => setVerification(event.target.value)}
        />

        <div className="flex flex-col md:flex-row md:justify-between gap-3">
          <Button variant="outline" onClick={closeModal}>
            No, I&apos;ve changed my mind
          </Button>
          <Button
            color="danger"
            disabled={isDeletingAccount || verification !== email}
            onClick={() => {
              deleteAccount();
              closeModal();
            }}
          >
            Yes, I&apos;m sure
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteAccount;
