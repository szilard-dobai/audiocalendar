"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { User } from "@/types";
import { useState } from "react";
import LinkGoogle from "./LinkGoogle";
import LinkSpotify from "./LinkSpotify";

type Props = {
  user: User;
};

const ManageAccount = ({ user }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Manage Account</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LinkSpotify isAccessGranted={user.hasSpotifyAccess} />
        <LinkGoogle isAccessGranted={user.hasGoogleAccess} />
      </Modal>
    </div>
  );
};

export default ManageAccount;
