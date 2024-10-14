export function getUserWebsiteUrl(suffixUrl: string) {
  let baseUrl = process.env.NEXT_PUBLIC_SECONDARY_APP_URL;
  let processedSuffixUrl = suffixUrl;

  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }
  if (processedSuffixUrl.startsWith("/")) {
    processedSuffixUrl = processedSuffixUrl.slice(1);
  }

  return `${baseUrl}/${processedSuffixUrl}`;
}
