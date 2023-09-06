import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import dayjs from "https://esm.sh/dayjs@1.11.9";
import { corsHeaders } from "../_shared/cors.ts";
import { createResponse } from "../_shared/createResponse.ts";
import { createSpotifyClient } from "../_shared/spotifyClient.ts";
import { createSupabaseServerClient } from "../_shared/supabaseClient.ts";
import { mapTrackToSong } from "./mapTrackToSong.ts";
import type { QueryRange, Song } from "./types.ts";
import { validateRequest } from "./validateRequest.ts";

serve(async (req) => {
  // This is needed in order to invoke function from a browser.
  // Note: might not need this actually
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    validateRequest(req.headers);

    const supabase = createSupabaseServerClient();

    const { data: spotifyTokens } = await supabase
      .from("spotify_tokens")
      .select("*");

    if (!spotifyTokens) {
      throw new Error("No spotify tokens!");
    }

    const { data: latestPlayedSongs } = await supabase
      .from("latest_played_songs")
      .select("*")
      .returns<Song[]>();
    const latestUserSongMap =
      latestPlayedSongs?.reduce<Record<string, Song>>(
        (acc, it) => ({ ...acc, [it.userId]: it }),
        {}
      ) || {};

    for (const token of spotifyTokens) {
      const lastSong = latestUserSongMap[token.userId];
      const userId = token.userId;

      const spotify = await createSpotifyClient(token);
      if (!spotify) {
        console.error(`Error creating spotify client for ${userId}`);
        continue;
      }

      const recentlyPlayedTracksFilter: QueryRange | undefined =
        lastSong?.playedAt
          ? {
              timestamp: dayjs(lastSong.playedAt).valueOf(),
              type: "after",
            }
          : undefined;
      const { items: songs } = await spotify.player.getRecentlyPlayedTracks(
        20,
        recentlyPlayedTracksFilter
      );
      await supabase.from("history").insert(
        songs.map((track) => ({
          ...mapTrackToSong(track),
          userId,
        }))
      );
    }

    return createResponse({
      code: 200,
      data: null,
    });
  } catch (error) {
    console.error(error.message);
    return createResponse({
      code: 400,
      data: { error: error.message },
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/sync-songs' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
