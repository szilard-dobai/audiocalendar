import type { User as SupabaseUser } from "@supabase/supabase-js";

export type User = SupabaseUser & {
  hasGoogleAccess: boolean;
  hasSpotifyAccess: boolean;
};
