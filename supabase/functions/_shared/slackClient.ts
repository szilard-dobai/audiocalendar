import { WebClient } from "https://deno.land/x/slack_web_api@6.7.2/mod.js";

const TOKEN = Deno.env.get("SLACK_TOKEN") || "";

export const CHANNEL = "C05QUF7G30F";

export const slack = new WebClient(TOKEN);

export const postErrorToSlack = (functionName: string, message: string) =>
  slack.chat.postMessage({
    text: `*ERROR!* Uh oh, \`${functionName}\` encountered an error: ${message}!`,
    channel: CHANNEL,
  });
