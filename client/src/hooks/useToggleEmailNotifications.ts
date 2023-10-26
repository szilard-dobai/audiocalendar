"use client";

import QueryKeys from "@/hooks/queryKeys";
import { createSupabaseClient } from "@/utils/client/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type ToggleEmailNotificationsInput = {
  areOn: boolean;
};

const useToggleEmailNotifications = () => {
  const supabase = createSupabaseClient();
  const queryClient = useQueryClient();

  return useMutation<void, string, ToggleEmailNotificationsInput>({
    mutationFn: async ({ areOn }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("user_preferences")
        .update({
          emailNotifications: areOn,
        })
        .eq("id", user!.id);

      if (error) {
        throw `Oh no! An error occured: ${error.message}`;
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QueryKeys.currentUser() }),
    retry: 0,
  });
};

export default useToggleEmailNotifications;
