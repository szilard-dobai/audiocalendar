import type { Calendar, Client, Song } from "../_shared/supabaseClient.ts";

export const getSongs = async (supabase: Client) => {
  const { data: songs } = await supabase
    .from("history")
    .select("*")
    .eq("addedToCalendar", false)
    .order("playedAt", { ascending: true });
  if (!songs) {
    throw new Error("No songs to sync!");
  }
  const songsMap = songs.reduce<Record<string, Song[]>>(
    (acc, song) => ({
      ...acc,
      [song.userId]: [...(acc[song.userId] || []), song],
    }),
    {}
  );

  return songsMap;
};

export const getCalendars = async (supabase: Client) => {
  const { data: calendars } = await supabase
    .from("google_calendars")
    .select("*");
  if (!calendars) {
    throw new Error("No calendars to sync!");
  }
  const calendarsMap = calendars.reduce<Record<string, Calendar>>(
    (acc, calendar) => ({ ...acc, [calendar.userId]: calendar }),
    {}
  );

  return calendarsMap;
};

export const getTokens = async (supabase: Client) => {
  const { data: tokens } = await supabase.from("google_tokens").select("*");
  if (!tokens) {
    throw new Error("No tokens!");
  }
  return tokens;
};
