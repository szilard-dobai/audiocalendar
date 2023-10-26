const HANDLE_NEW_NOTIFICATION_SECRET = Deno.env.get(
  "HANDLE_NEW_NOTIFICATION_SECRET"
);

export const validateRequest = (headers: Headers) => {
  if (
    headers.get("WWW-Authenticate") !==
    `Bearer ${HANDLE_NEW_NOTIFICATION_SECRET}`
  ) {
    throw new Error("Unauthorized!");
  }
};
