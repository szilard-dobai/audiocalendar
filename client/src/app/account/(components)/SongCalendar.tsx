"use client";

import Button from "@/components/Button";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import QueryKeys from "@/hooks/queryKeys";
import { createSupabaseClient } from "@/utils/client/supabase";
import type { Database } from "@audiocalendar/types";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import type { ValueOf } from "next/dist/shared/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

dayjs.extend(isoWeek);

type Song = Database["public"]["Tables"]["history"]["Row"];

const useSongCalendar = (from: string, to: string) => {
  const supabase = createSupabaseClient();

  return useQuery({
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("User must be logged in!");
      }
      const { data } = await supabase
        .from("history")
        .select("*", { count: "exact" })
        .eq("userId", session?.user.id)
        .order("playedAt", { ascending: false })
        .gte("playedAt", from)
        .lte("playedAt", to)
        .throwOnError();

      return data;
      // return data?.reduce<Record<string, Song[]>>((acc, el) => {
      //   const key = dayjs(el.playedAt).startOf("day").format("dddd");
      //   if (acc[key]) {
      //     acc[key].push(el);
      //   } else {
      //     acc[key] = [];
      //   }
      //   return acc;
      // }, {});
    },
    queryKey: QueryKeys.calendar(from),
    keepPreviousData: true,
  });
};

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const SongCalendar = () => {
  const [referenceDate, setReferenceDate] = useState(dayjs());
  const [from, setFrom] = useState(
    referenceDate.startOf("isoWeek").toISOString()
  );
  const [to, setTo] = useState(referenceDate.endOf("isoWeek").toISOString());
  const { data, isLoading } = useSongCalendar(from, to);

  useEffect(() => {
    setFrom(referenceDate.startOf("isoWeek").toISOString());
    setTo(referenceDate.endOf("isoWeek").toISOString());
  }, [referenceDate]);

  const renderDay = (
    index: number,
    songs: ValueOf<NonNullable<typeof data>>
  ) => {
    return (
      <div>
        <p className="text-xl font-bold mb-6 text-center">
          {DAYS[index]}
          <br />
          <span className="text-sm font-normal">
            {dayjs(from).add(index, "days").format("DD/MMM/YYYY")}
          </span>
        </p>
        {/* {!!songs?.length && (
          <div className="flex flex-col">
            {songs.map((el) => (
              <div key={el.id} className="border-b pb-4 mb-4">
                <Link
                  className="mb-3 flex flex-col items-center hover:bg-complement-50 cursor-pointer text-center rounded-xl"
                  href={el.songUrl}
                  target="_blank"
                >
                  <span className="font-semibold">
                    {dayjs(el.playedAt).format("HH:mm")}
                    {" - "}
                    {dayjs(el.playedAt)
                      .add(el.songDuration, "milliseconds")
                      .format("HH:mm")}
                  </span>
                  <Image
                    src={el.albumImage}
                    width={100}
                    height={100}
                    className="border"
                    alt={`${el.artist} -  ${el.album}`}
                  />
                  <span>
                    {el.artist} - {el.song}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )} */}
      </div>
    );
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <p>
          Song Calendar from {dayjs(from).format("dddd, DD/MM/YYYY")} to{" "}
          {dayjs(to).format("dddd, DD/MM/YYYY")}
        </p>

        <div className="flex gap-3">
          <Button
            onClick={() => setReferenceDate((ref) => ref.subtract(1, "week"))}
          >
            Previous
          </Button>
          <Button onClick={() => setReferenceDate((ref) => ref.add(1, "week"))}>
            Next
          </Button>
        </div>
      </div>
      <WeeklyCalendar data={data || []} startTimestamp={from.valueOf()} />

      {/* {!!data && (
        <div className="grid grid-cols-7 gap-x-3">
          {Array.from({ length: 7 }, (_, index) => index).map((day) =>
            renderDay(day, data[DAYS[day]])
          )}
        </div>
      )} */}
    </div>
  );
};

export default SongCalendar;
