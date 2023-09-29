import { createSupabaseClient } from "@/utils/client/supabase";
import { useQuery } from "@tanstack/react-query";
import QueryKeys from "./queryKeys";

const getPagination = (page: number, size: number) => {
  const p = page - 1;
  const from = p * size;
  const to = from + size - 1;

  return { from, to };
};

const useGetSongHistory = (page: number = 1, size: number = 20) => {
  const supabase = createSupabaseClient();
  const { from, to } = getPagination(page, size);

  return useQuery({
    queryFn: async () =>
      supabase
        .from("history")
        .select("*", { count: "exact" })
        .order("playedAt", { ascending: false })
        .range(from, to)
        .throwOnError()
        .then(({ data, count }) => ({ songs: data, count })),
    queryKey: QueryKeys.history(page),
    keepPreviousData: true,
  });
};

export default useGetSongHistory;
