const SHORTCODE_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
// Media IDs keep a millisecond timestamp above bit 23, counted from this epoch.
const MEDIA_ID_EPOCH = 1_314_220_021_721n;

export const OEMBED_ENDPOINT = "https://graph.threads.com/v1.0/oembed";

export function threadsShortcode(url: string) {
  const code = url.match(
    /threads\.(?:com|net)\/(?:@[\w.]+\/post|t)\/([\w-]+)/,
  )?.[1];

  if (!code) {
    throw new Error(`Not a Threads post URL: ${url}`);
  }

  return code;
}

export function threadsPostDate(shortcode: string) {
  let id = 0n;

  for (const char of shortcode) {
    id = id * 64n + BigInt(SHORTCODE_ALPHABET.indexOf(char));
  }

  return new Date(Number((id >> 23n) + MEDIA_ID_EPOCH));
}
