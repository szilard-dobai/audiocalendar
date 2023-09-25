"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useState } from "react";
import UnlinkGoogle from "./UnlinkGoogle";
import UnlinkSpotify from "./UnlinkSpotify";

const ManageAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Manage Account</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UnlinkSpotify className="mb-6" />
        <UnlinkGoogle />
      </Modal>
    </div>
  );
};

export default ManageAccount;
