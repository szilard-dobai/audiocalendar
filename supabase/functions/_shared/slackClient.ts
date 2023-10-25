import { WebClient } from "https://deno.land/x/slack_web_api@6.7.2/mod.js";

const TOKEN = Deno.env.get("VITE_SLACK_TOKEN") || "";

export const CHANNEL = "C05QUF7G30F";

export const createSlackClient = () => {
  const slack = new WebClient(TOKEN);

  return slack;
};
