"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useState } from "react";
import type { CurrentUser } from "../me/schema";
import LinkGoogle from "./LinkGoogle";
import LinkSpotify from "./LinkSpotify";

type Props = {
  user: CurrentUser;
};

const ManageAccount = ({ user }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Manage Account</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LinkSpotify isAccessGranted={user.hasSpotifyAccess} />
        <hr className="my-6" />
        <LinkGoogle isAccessGranted={user.hasGoogleAccess} />
      </Modal>
    </div>
  );
};

export default ManageAccount;
