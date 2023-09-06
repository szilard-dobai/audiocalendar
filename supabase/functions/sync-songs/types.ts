import { Database } from "../_shared/supabaseClient.ts";

export type Song = Database["public"]["Tables"]["history"]["Row"];
export type SpotifyToken =
  Database["public"]["Tables"]["spotify_tokens"]["Row"];

// Copied from @spotify/web-api-ts-sdk because it's not exported 🫠
export interface QueryRange {
  timestamp: number;
  type: "before" | "after";
}