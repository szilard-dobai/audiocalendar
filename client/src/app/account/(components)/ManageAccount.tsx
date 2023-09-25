"use client";

import Modal from "@/components/Modal";
import UnlinkSpotify from "./UnlinkSpotify";
import { useState } from "react";
import Button from "@/components/Button";

const ManageAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Manage Account</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UnlinkSpotify />
      </Modal>
    </div>
  );
};

export default ManageAccount;
