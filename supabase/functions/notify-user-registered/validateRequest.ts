const NOTIFY_USER_REGISTERED_SECRET = Deno.env.get(
  "NOTIFY_USER_REGISTERED_SECRET"
);

export const validateRequest = (headers: Headers) => {
  if (
    headers.get("WWW-Authenticate") !==
    `Bearer ${NOTIFY_USER_REGISTERED_SECRET}`
  ) {
    throw new Error("Unauthorized!");
  }
};
