"use client";

import Button from "@/components/Button";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import QueryKeys from "@/hooks/queryKeys";
import { useIsMobile } from "@/hooks/useIsMobile";
import { createSupabaseClient } from "@/utils/client/supabase";
import chevronLeft from "@public/chevron-left-solid.svg";
import chevronRight from "@public/chevron-right-solid.svg";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import Image from "next/image";
import { useEffect, useState } from "react";

dayjs.extend(isoWeek);

const TODAY = dayjs();

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
    },
    queryKey: QueryKeys.calendar(from),
    keepPreviousData: true,
  });
};

const SongCalendar = () => {
  const isMobile = useIsMobile();
  const [referenceDate, setReferenceDate] = useState(dayjs());
  const [from, setFrom] = useState(referenceDate.startOf("isoWeek"));
  const [to, setTo] = useState(referenceDate.endOf("isoWeek"));
  const { data, isLoading } = useSongCalendar(
    from.toISOString(),
    to.toISOString()
  );

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

      <WeeklyCalendar data={data || []} startTimestamp={from.toISOString()} />
    </div>
  );
};

export default SongCalendar;
