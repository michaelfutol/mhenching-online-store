export const ATTRIBUTION_STORAGE_KEY = "mhenching_attribution_v1";

export type AttributionSource =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "messenger"
  | "qr"
  | "direct"
  | "referral"
  | "other";

export type CampaignAttribution = {
  source: AttributionSource;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
  landingPath: string;
  capturedAt: string;
};

export type AttributionSnapshot = {
  firstTouch: CampaignAttribution;
  lastTouch: CampaignAttribution;
};

type CaptureInput = {
  search: string;
  pathname: string;
  referrer?: string;
  currentHost?: string;
  capturedAt?: string;
};

const SOURCE_ALIASES: Record<string, AttributionSource> = {
  fb: "facebook",
  facebook: "facebook",
  meta: "facebook",
  ig: "instagram",
  instagram: "instagram",
  tiktok: "tiktok",
  tt: "tiktok",
  messenger: "messenger",
  m_me: "messenger",
  qr: "qr",
  qrcode: "qr",
  direct: "direct"
};

function clean(value: string | null | undefined, maxLength = 120): string | undefined {
  if (!value) return undefined;

  const normalized = value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, maxLength);
  return normalized || undefined;
}

function normalizeSource(value: string | null): AttributionSource | undefined {
  const cleaned = clean(value, 40)?.toLowerCase().replace(/[\s-]+/g, "_");
  if (!cleaned) return undefined;
  return SOURCE_ALIASES[cleaned] ?? "other";
}

function sourceFromReferrer(referrer: string | undefined): AttributionSource | undefined {
  if (!referrer) return undefined;

  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (host.includes("facebook.com") || host.includes("fb.com")) return "facebook";
    if (host.includes("instagram.com")) return "instagram";
    if (host.includes("tiktok.com")) return "tiktok";
    if (host.includes("messenger.com") || host === "m.me") return "messenger";
    return "referral";
  } catch {
    return undefined;
  }
}

function isInternalReferrer(referrer: string | undefined, currentHost: string | undefined): boolean {
  if (!referrer || !currentHost) return false;

  try {
    return new URL(referrer).host.toLowerCase() === currentHost.toLowerCase();
  } catch {
    return false;
  }
}

export function captureAttribution(input: CaptureInput): CampaignAttribution | null {
  const params = new URLSearchParams(input.search);
  const hasCampaignSignal = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].some(
    (key) => params.has(key)
  );

  if (!hasCampaignSignal && isInternalReferrer(input.referrer, input.currentHost)) {
    return null;
  }

  const explicitSource = normalizeSource(params.get("utm_source"));
  const referrerSource = sourceFromReferrer(input.referrer);
  const source = explicitSource ?? referrerSource ?? "direct";
  const defaultMedium = source === "direct" ? "direct" : source === "referral" ? "referral" : "social";
  const pathname = input.pathname.startsWith("/") ? input.pathname : `/${input.pathname}`;

  return {
    source,
    medium: clean(params.get("utm_medium"), 60) ?? defaultMedium,
    campaign: clean(params.get("utm_campaign")),
    content: clean(params.get("utm_content")),
    term: clean(params.get("utm_term")),
    landingPath: pathname.slice(0, 500),
    capturedAt: input.capturedAt ?? new Date().toISOString()
  };
}

export function parseStoredAttribution(raw: string | null): AttributionSnapshot | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<AttributionSnapshot>;
    if (!parsed.firstTouch || !parsed.lastTouch) return null;
    return parsed as AttributionSnapshot;
  } catch {
    return null;
  }
}

export function mergeAttribution(
  existing: AttributionSnapshot | null,
  nextTouch: CampaignAttribution
): AttributionSnapshot {
  return {
    firstTouch: existing?.firstTouch ?? nextTouch,
    lastTouch: nextTouch
  };
}

export function buildCampaignUrl(
  destination: string,
  campaign: {
    source: AttributionSource;
    medium?: string;
    campaign: string;
    content?: string;
    term?: string;
  }
): string {
  const url = new URL(destination, "https://mhenching.local");
  url.searchParams.set("utm_source", campaign.source);
  url.searchParams.set("utm_medium", clean(campaign.medium, 60) ?? "social");
  url.searchParams.set("utm_campaign", clean(campaign.campaign) ?? "campaign");

  const content = clean(campaign.content);
  const term = clean(campaign.term);
  if (content) url.searchParams.set("utm_content", content);
  if (term) url.searchParams.set("utm_term", term);

  if (url.origin === "https://mhenching.local") {
    return `${url.pathname}${url.search}${url.hash}`;
  }

  return url.toString();
}
