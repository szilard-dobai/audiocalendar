import {
  createSupabaseAdminClient,
  createSupabaseClient,
} from "@/utils/handler/supabase";

export const deleteCurrentUser = async () => {
  const supabase = createSupabaseClient();
  const admin = createSupabaseAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthenticated!");
  }

  const { error } = await admin.auth.admin.deleteUser(user.id, false);
  if (error) {
    throw new Error(`${error.name}: ${error?.message}`);
  }
};
