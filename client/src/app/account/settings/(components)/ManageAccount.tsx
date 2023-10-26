"use client";

import Heading from "@/components/Heading";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import useGetNotifications from "@/hooks/useGetNotifications";
import type { CurrentUser } from "../../me/schema";
import DeleteAccount from "./DeleteAccount";
import LinkGoogle from "./LinkGoogle";
import LinkSpotify from "./LinkSpotify";
import Notifications from "./Notifications";
import Preferences from "./Preferences";

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

      <Heading level={2}>Integrations</Heading>
      <hr className="my-6" />
      <LinkSpotify isAccessGranted={user.hasSpotifyAccess} />
      <hr className="my-6" />
      <LinkGoogle isAccessGranted={user.hasGoogleAccess} />
      <hr className="my-6" />

      <Heading level={2}>Management</Heading>
      <hr className="my-6" />
      <Preferences emailNotifications={user.preferences.emailNotifications} />
      <hr className="my-6" />
      <DeleteAccount email={user.email} />
    </div>
  );
};

export default ManageAccount;
