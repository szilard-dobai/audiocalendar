import { RequestPayload } from "./types.ts";

export const parseBody = async (req: Request): Promise<RequestPayload> => {
  const { code, redirectUri, authuser, prompt, scope }: RequestPayload =
    await req.json().catch(() => {
      throw new Error("Missing request body!");
    });

  if (typeof code !== "string") {
    throw new Error(
      `Invalid value for "code", expected string, received ${typeof code}.`
    );
  }
  if (typeof redirectUri !== "string") {
    throw new Error(
      `Invalid value for "redirectUri", expected string, received ${typeof redirectUri}.`
    );
  }
  if (typeof authuser !== "string") {
    throw new Error(
      `Invalid value for "authuser", expected string, received ${typeof authuser}.`
    );
  }
  if (typeof prompt !== "string") {
    throw new Error(
      `Invalid value for "prompt", expected string, received ${typeof prompt}.`
    );
  }
  if (typeof scope !== "string") {
    throw new Error(
      `Invalid value for "scope", expected string, received ${typeof scope}.`
    );
  }

  return { code, redirectUri, authuser, prompt, scope };
};
