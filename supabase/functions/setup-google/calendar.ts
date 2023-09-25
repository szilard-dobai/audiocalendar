import { calendar_v3 } from "https://esm.sh/googleapis@126.0.1";

const DEFAULT_CALENDAR_SETTINGS = {
  summary: "Audiocalendar",
  description: "Complete history of songs listened to on Spotify",
};

export const createCalendar = (gcal: calendar_v3.Calendar) =>
  gcal.calendars.insert({
    requestBody: {
      summary: DEFAULT_CALENDAR_SETTINGS.summary,
      description: DEFAULT_CALENDAR_SETTINGS.description,
    },
  });

export const getCalendar = (gcal: calendar_v3.Calendar, id: string) =>
  gcal.calendars.get({ calendarId: id });
