"use client";

import Button from "@/components/Button";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import QueryKeys from "@/hooks/queryKeys";
import { createSupabaseClient } from "@/utils/client/supabase";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useEffect, useState } from "react";

dayjs.extend(isoWeek);

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

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <p>
          {from.isSame(to, "month")
            ? from.format("MMMM YYYY")
            : `${from.format("MMMM")}-${to.format("MMMM YYYY")}`}
        </p>

        <div className="flex gap-3">
          <Button
            onClick={() => setReferenceDate((ref) => ref.subtract(1, "week"))}
          >
            Previous
          </Button>
          <Button
            onClick={() => setReferenceDate((ref) => ref.add(1, "week"))}
            disabled={dayjs(from).isSame(dayjs(), "week")}
          >
            Next
          </Button>
        </div>
      </div>

      <WeeklyCalendar data={data || []} startTimestamp={from.toISOString()} />
    </div>
  );
};

export default SongCalendar;
