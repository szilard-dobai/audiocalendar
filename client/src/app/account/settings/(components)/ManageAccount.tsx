"use client";

import useGetCurrentUserQuery from "@/hooks/useGetCurrentUserQuery";
import useGetNotifications from "@/hooks/useGetNotifications";
import dayjs from "dayjs";
import type { CurrentUser } from "../../me/schema";
import LinkGoogle from "./LinkGoogle";
import LinkSpotify from "./LinkSpotify";

type Props = {
  initialData: CurrentUser;
};

const ManageAccount = ({ initialData }: Props) => {
  const { data: user } = useGetCurrentUserQuery(initialData);
  const { data: notifications } = useGetNotifications();

  return (
    <div>
      {!!notifications?.length && (
        <div className="py-6 px-3 bg-complement-50 rounded-xl text-complement mb-12">
          <h1 className="font-2xl font-semibold mb-3">Notifications</h1>
          <ul>
            {notifications.map(({ id, createdAt, message }) => (
              <li key={id}>
                <p>{dayjs(createdAt).format("dddd, DD/MM/YYYY, [at] HH:mm")}</p>
                <p className="mb-3">{message}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <LinkSpotify isAccessGranted={user.hasSpotifyAccess} />
      <hr className="my-6" />
      <LinkGoogle isAccessGranted={user.hasGoogleAccess} />
    </div>
  );
};

export default ManageAccount;
