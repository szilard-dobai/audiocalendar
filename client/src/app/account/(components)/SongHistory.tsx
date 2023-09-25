import { createSupabaseClient } from "@/utils/server/supabase";
import dayjs from "dayjs";
import Image from "next/image";

const getData = async () => {
  const supabase = createSupabaseClient();

  return supabase
    .from("history")
    .select("*")
    .order("playedAt", { ascending: false });
};

const SongHistory = async () => {
  const { data } = await getData();

  return (
    <>
      <h1 className="mb-6 font-semibold text-2xl">Song History</h1>
      {data?.map((el) => (
        <div key={el.id} className="border-b pb-4 mb-4">
          <p className="mb-3">
            <span className="font-semibold">
              {dayjs(el.playedAt).format("dddd, DD/MM/YYYY, [at] HH:mm")}
            </span>
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
    </>
  );
};

export default SongHistory;
