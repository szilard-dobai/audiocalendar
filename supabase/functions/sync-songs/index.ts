import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import {
  SpotifyApi,
  type AccessToken,
  type PlayHistory,
} from "https://esm.sh/@spotify/web-api-ts-sdk";
import dayjs from "https://esm.sh/dayjs";
import { corsHeaders } from "../_shared/cors.ts";
import { createResponse } from "../_shared/createResponse.ts";
import { createSupabaseServerClient } from "../_shared/supabaseClient.ts";
import { getNewAccessToken } from "./refreshToken.ts";
import type { QueryRange, Song } from "./types.ts";

const CLIENT_ID = Deno.env.get("VITE_SPOTIFY_CLIENT_ID") || "";

const mapTrackToSong = (song: PlayHistory): Omit<Song, "id" | "userId"> => {
  const { artist, artistId, artistUrl } = song.track.artists.reduce<
    Record<"artist" | "artistId" | "artistUrl", string[]>
  >(
    (acc, artist) => ({
      artist: [...acc.artist, artist.name],
      artistId: [...acc.artistId, artist.id],
      artistUrl: [...acc.artistUrl, artist.external_urls.spotify],
    }),
    { artist: [], artistId: [], artistUrl: [] }
  );
  return {
    album: song.track.album.name,
    albumId: song.track.album.id,
    albumImage: song.track.album.images[0].url,
    albumUrl: song.track.album.external_urls.spotify,
    artist: artist.join(", "),
    artistId: artistId.join(", "),
    artistUrl: artistUrl.join(", "),
    playedAt: song.played_at,
    song: song.track.name,
    songDuration: song.track.duration_ms,
    songId: song.track.id,
    songUrl: song.track.external_urls.spotify,
    contextUrl: song.context?.external_urls?.spotify,
    songPreviewUrl: song.track.preview_url,
  };
};

serve(async (req) => {
  // This is needed in order to invoke function from a browser.
  // Note: might not need this actually
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // read all tokens inside spotify_tokens table
    // read latest songs for each user
    // go through each token pair sequentially:
    //    - figure out if expired. if yes, refresh, else continue
    //    - pull spotify history beginning with latest song's listened to timestamps
    //    - insert new songs in DB

    // bonus: figure out how to make this function callable only by supabase & not exposed to everyone else
    if (
      req.headers.get("Authorization") !==
        `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}` &&
      req.headers.get("WWW-Authenticate") !==
        `Bearer ${Deno.env.get("VITE_SYNC_SONGS_SECRET")}`
    ) {
      throw new Error("Unauthorized!");
    }

    const now = dayjs();
    const supabase = createSupabaseServerClient();
    const { data: spotifyTokens } = await supabase
      .from("spotify_tokens")
      .select("*");
    const { data: latestPlayedSongs } = await supabase
      .from("latest_played_songs")
      .select("*")
      .returns<Song[]>();

    const latestUserSongMap =
      latestPlayedSongs?.reduce<Record<string, Song>>(
        (acc, it) => ({ ...acc, [it.userId]: it }),
        {}
      ) || {};

    if (!spotifyTokens) {
      throw new Error("No spotify tokens!");
    }

    for (const token of spotifyTokens) {
      const lastSong = latestUserSongMap[token.userId];
      let accessToken: string;

      if (
        token.expiresAt === null ||
        token.expiresIn === null ||
        token.refreshToken === null
      ) {
        console.log(`${token.userId} does not have a token!`);
        continue;
      }

      if (dayjs((token.expiresAt + token.expiresIn) * 1000).isBefore(now)) {
        const newToken = await getNewAccessToken(token.refreshToken);
        accessToken = newToken.access_token;
        await supabase.from("spotify_tokens").upsert(
          {
            accessToken,
            userId: token.userId,
            expiresAt: now.add(newToken.expires_in, "seconds").valueOf(),
          },
          { onConflict: "userId" }
        );
      } else {
        accessToken = token.accessToken!;
      }

      const spotify = SpotifyApi.withAccessToken(CLIENT_ID, {
        access_token: accessToken,
      } as AccessToken);

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
          userId: token.userId,
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
