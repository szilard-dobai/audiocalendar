import type { PlayHistory } from "https://esm.sh/@spotify/web-api-ts-sdk";
import type { Song } from "./types.ts";

export const mapTrackToSong = (
  song: PlayHistory
): Omit<Song, "id" | "userId"> => {
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
