"use client";

import useGetCurrentUserQuery from "@/hooks/useGetCurrentUserQuery";
import type { CurrentUser } from "../../me/schema";
import LinkGoogle from "./LinkGoogle";
import LinkSpotify from "./LinkSpotify";

type Props = {
  initialData: CurrentUser;
};

const ManageAccount = ({ initialData }: Props) => {
  const { data } = useGetCurrentUserQuery(initialData);

  return (
    <div>
      <LinkSpotify isAccessGranted={data.hasSpotifyAccess} />
      <hr className="my-6" />
      <LinkGoogle isAccessGranted={data.hasGoogleAccess} />
    </div>
  );
};

export default ManageAccount;
