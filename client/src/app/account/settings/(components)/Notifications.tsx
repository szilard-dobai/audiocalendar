import type { Database } from "@audiocalendar/types";
import dayjs from "dayjs";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

type Props = { data: Notification[] | null };

const Notifications = ({ data }: Props) => {
  if (!data?.length) {
    return null;
  }

  return (
    <ul>
      {data.map(({ id, createdAt, message }) => (
        <li key={id}>
          <p>{dayjs(createdAt).format("dddd, DD/MM/YYYY, [at] HH:mm")}</p>
          <p className="mb-3">{message}</p>
        </li>
      ))}
    </ul>
  );
};

export default Notifications;
