"use client";

import Button from "@/components/Button";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import { useGetSongs, type Song } from "@/hooks/useGetSongs";
import { useIsMobile } from "@/hooks/useIsMobile";
import chevronLeft from "@public/chevron-left-solid.svg";
import chevronRight from "@public/chevron-right-solid.svg";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

dayjs.extend(isoWeek);

const TODAY = dayjs();

type SongWithCount = Song & { count: number };

const SongCalendar = () => {
  const isMobile = useIsMobile();
  const [referenceDate, setReferenceDate] = useState(dayjs());
  const [from, setFrom] = useState(referenceDate.startOf("isoWeek"));
  const [to, setTo] = useState(referenceDate.endOf("isoWeek"));
  const { data } = useGetSongs(from.toISOString(), to.toISOString());

  const statistics:
    | {
        numberOfSongs: number;
        numberOfArtists: number;
        songOfTheWeek: SongWithCount;
      }
    | undefined = useMemo(() => {
    if (!data) {
      return;
    }

    const numberOfSongs = data.length;

    const numberOfArtists = data.reduce((set, song) => {
      if (song.artist.includes(", ")) {
        song.artist.split(", ").forEach((artist) => set.add(artist));
        return set;
      }
      set.add(song.artist);
      return set;
    }, new Set<string>()).size;

    const songsMap = data.reduce<Record<string, SongWithCount>>((acc, song) => {
      if (acc[song.songId]) {
        acc[song.songId].count += 1;
        return acc;
      }
      acc[song.songId] = {
        ...song,
        count: 1,
      };
      return acc;
    }, {});
    const songOfTheWeekId = Object.keys(songsMap).sort(
      (s1, s2) => songsMap[s2].count - songsMap[s1].count
    )[0];
    const songOfTheWeek = songsMap[songOfTheWeekId];

    return {
      numberOfSongs,
      numberOfArtists,
      songOfTheWeek,
    };
  }, [data]);

  useEffect(() => {
    setFrom(referenceDate.startOf("isoWeek"));
    setTo(referenceDate.endOf("isoWeek"));
  }, [referenceDate]);

  const renderMonth = () => {
    if (from.isSame(to, "month")) {
      return from.format("MMMM YYYY");
    }

    const month = isMobile ? "MMM" : "MMMM";
    const monthWithYear = `${month} YYYY`;
    return `${from.format(month)}-${to.format(monthWithYear)}`;
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <p className="font-semibold text-2xl text-brand">{renderMonth()}</p>

        <div className="flex gap-3 shrink-0">
          <Button
            onClick={() => setReferenceDate((ref) => ref.subtract(1, "week"))}
          >
            <Image
              src={chevronLeft}
              alt="previous week"
              height={12}
              width={12}
            />
          </Button>
          <Button
            onClick={() => setReferenceDate((ref) => ref.add(1, "week"))}
            disabled={referenceDate.isSame(TODAY, "week")}
          >
            <Image src={chevronRight} alt="next week" height={12} width={12} />
          </Button>
          <Button onClick={() => setReferenceDate(TODAY)}>Today</Button>
        </div>
      </div>

      {statistics && (
        <dl className="flex flex-col md:flex-row gap-6 items-baseline mb-6">
          <div className="text-center flex-1">
            <dt className="uppercase font-light text-lg"># Songs</dt>
            <dd className="text-xl font-semibold">
              {statistics.numberOfSongs}
            </dd>
          </div>

          <div className="text-center flex-1">
            <dt className="uppercase font-light text-lg"># Artists</dt>
            <dd className="text-xl font-semibold">
              {statistics.numberOfArtists}
            </dd>
          </div>

          <div className="text-center flex-1">
            <dt className="uppercase font-light text-lg">Song of the Week</dt>
            <dd className="text-xl font-semibold">
              {statistics.songOfTheWeek ? (
                <a
                  href={statistics.songOfTheWeek.songUrl}
                  className="cursor-pointer hover:underline"
                  target="_blank"
                >
                  {statistics.songOfTheWeek.artist}
                  <br />
                  {statistics.songOfTheWeek.song} (
                  {statistics.songOfTheWeek.count})
                </a>
              ) : (
                "-"
              )}
            </dd>
          </div>
        </dl>
      )}

      <WeeklyCalendar data={data || []} startTimestamp={from.toISOString()} />
    </div>
  );
};

export default SongCalendar;
