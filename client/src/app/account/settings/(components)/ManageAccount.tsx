"use client";

import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import useGetNotifications from "@/hooks/useGetNotifications";
import type { CurrentUser } from "../../me/schema";
import LinkGoogle from "./LinkGoogle";
import LinkSpotify from "./LinkSpotify";
import Notifications from "./Notifications";

type Props = {
  initialData: CurrentUser;
};

const ManageAccount = ({ initialData }: Props) => {
  const { data: user } = useGetCurrentUser(initialData);
  const { data: notifications } = useGetNotifications();

  return (
    <div>
      {!!notifications?.length && (
        <div className="py-6 px-3 bg-complement-50 rounded-xl text-complement mb-12">
          <h1 className="font-2xl font-semibold mb-3">Notifications</h1>
          <Notifications data={notifications} />
        </div>
      )}

      <LinkSpotify isAccessGranted={user.hasSpotifyAccess} />
      <hr className="my-6" />
      <LinkGoogle isAccessGranted={user.hasGoogleAccess} />
    </div>
  );
};

export default ManageAccount;
