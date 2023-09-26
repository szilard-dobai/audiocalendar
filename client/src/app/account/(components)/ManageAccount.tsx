"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import useGetCurrentUserQuery from "@/hooks/useGetCurrentUserQuery";
import { useState } from "react";
import type { CurrentUser } from "../me/schema";
import LinkGoogle from "./LinkGoogle";
import LinkSpotify from "./LinkSpotify";

type Props = {
  initialData: CurrentUser;
};

const ManageAccount = ({ initialData }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useGetCurrentUserQuery(initialData);

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Manage Account</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LinkSpotify isAccessGranted={data.hasSpotifyAccess} />
        <hr className="my-6" />
        <LinkGoogle isAccessGranted={data.hasGoogleAccess} />
      </Modal>
    </div>
  );
};

export default ManageAccount;
