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
        <div key={el.id} className="border-b pb-4 mb-4">
          <p className="mb-3">
            <span className="font-semibold">{el.playedAt}</span>
            <Image
              src={el.albumImage}
              width={100}
              height={100}
              className="border"
              alt={`${el.artist} -  ${el.album}`}
            />
            <span>
              {el.artist} - {el.song} ({el.album})
            </span>
          </p>
          {el.songPreviewUrl && <audio src={el.songPreviewUrl} controls />}
        </div>
      ))}
    </div>
  );
};

export default SongHistory;
