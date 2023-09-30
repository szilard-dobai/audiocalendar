import { createSupabaseClient } from "@/utils/client/supabase";
import { useQuery } from "@tanstack/react-query";
import QueryKeys from "./queryKeys";

const useGetNotifications = () => {
  const supabase = createSupabaseClient();

  return useQuery({
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("userId", session!.user.id)
        .eq("resolved", false)
        .throwOnError();
      return data;
    },
    queryKey: QueryKeys.notifications(),
  });
};

export default useGetNotifications;
