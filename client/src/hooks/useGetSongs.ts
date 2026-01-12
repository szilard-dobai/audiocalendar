import { createClient } from "@/utils/client/supabase";
import type { Database } from "@audiocalendar/types";
import { useQuery } from "@tanstack/react-query";
import QueryKeys from "./queryKeys";

export type Song = Database["public"]["Tables"]["history"]["Row"];

export const useGetSongs = (from: string, to: string) => {
  const supabase = createClient();

  return useQuery<Song[]>({
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

      return data ?? [];
    },
    queryKey: QueryKeys.songs(from),
    // keepPreviousData removed in v5, use placeholderData for similar behavior
  });
};
