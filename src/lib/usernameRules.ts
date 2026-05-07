export const USERNAME_REGEX = /^[a-z0-9_]+$/;
export const USERNAME_MIN = 3;
export const USERNAME_MAX = 30;

export const RESERVED_USERNAMES = new Set([
  "about",
  "admin",
  "api",
  "contact",
  "ember",
  "faq",
  "profile",
]);

export type UsernameCheckReason =
  | "empty"
  | "too_short"
  | "too_long"
  | "invalid"
  | "reserved"
  | "taken";

export function validateUsernameFormat(
  username: string
): UsernameCheckReason | null {
  if (!username) return "empty";
  if (username.length < USERNAME_MIN) return "too_short";
  if (username.length > USERNAME_MAX) return "too_long";
  if (!USERNAME_REGEX.test(username)) return "invalid";
  if (RESERVED_USERNAMES.has(username)) return "reserved";
  return null;
}
