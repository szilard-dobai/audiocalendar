import {
  createAdminClient,
  createClient,
} from "@/utils/handler/supabase";

export const deleteCurrentUser = async () => {
  const [supabase, admin] = await Promise.all([
    createClient(),
    Promise.resolve(createAdminClient())
  ]);

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
