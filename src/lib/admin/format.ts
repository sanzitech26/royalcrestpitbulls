// Date only: these render on the server (UTC on Vercel), so a time of day would be in the wrong timezone for the owner.
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
