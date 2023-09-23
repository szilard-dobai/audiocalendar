import { Database } from "@audiocalendar/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

const getData = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  return supabase
    .from("history")
    .select("*")
    .order("playedAt", { ascending: false });
};

const SongHistory = async () => {
  const { data } = await getData();

  return (
    <div>
      {data?.map((el) => (
        <div
          key={el.id}
          style={{
            paddingBottom: "1rem",
            marginBottom: "1rem",
            borderBottom: "1px solid black",
          }}
        >
          <p>
            <strong>{el.playedAt}</strong>
            <br />
            <Image
              src={el.albumImage}
              width={100}
              height={100}
              style={{ border: "1px solid black" }}
              alt={`${el.artist} -  ${el.album}`}
            />
            <br />
            {el.id}, {el.artist}, {el.album}, {el.song}
          </p>
          {el.songPreviewUrl && <audio src={el.songPreviewUrl} controls />}
        </div>
      ))}
    </div>
  );
};

export default SongHistory;
