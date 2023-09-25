import type { User } from "@/types";
import { createSupabaseClient } from "@/utils/server/supabase";
import Logout from "./(components)/LogoutButton";
import ManageAccount from "./(components)/ManageAccount";
import SongHistory from "./(components)/SongHistory";

const getUserData = async (): Promise<User> => {
  const supabase = createSupabaseClient();

  const { data: googleToken } = await supabase
    .from("google_tokens")
    .select("*")
    .single();
  const { data: spotifyToken } = await supabase
    .from("spotify_tokens")
    .select("*")
    .single();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    ...user!,
    hasGoogleAccess: !!googleToken && !!googleToken.accessToken,
    hasSpotifyAccess: !!spotifyToken && !!spotifyToken.accessToken,
  };
};

const Account = async () => {
  const user = await getUserData();

  return (
    <>
      <div className="flex justify-end gap-3 mb-6">
        <ManageAccount user={user} />
        <Logout />
      </div>
      <SongHistory />
    </>
  );
};

export default Account;
