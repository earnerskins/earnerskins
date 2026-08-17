import { sihConfig } from "./config";
import type {
  SihItemsResponse,
  SihRawItem,
  SihProjectResponse,
  SihProject,
  SihCreateOrderResponse,
  SihOrderResponse,
  SihOrder,
} from "./types";

/**
 * Thin typed wrapper over the SIH Market API.
 * Reads config at call time (env may differ between script / server contexts)
 * and always sends the `apikey` header. Every method throws on transport
 * failure; callers decide how to degrade.
 */

class SihError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "SihError";
  }
}

async function call<T>(
  path: string,
  init?: RequestInit & { query?: Record<string, string | number | boolean | undefined> },
): Promise<T> {
  const cfg = sihConfig();
  if (!cfg.apiKey) throw new SihError("SIH_API_KEY is not configured");

  const url = new URL(`${cfg.apiBase}${path}`);
  if (init?.query) {
    for (const [k, v] of Object.entries(init.query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(url, {
    ...init,
    headers: {
      apikey: cfg.apiKey,
      ...(init?.body ? { "content-type": "application/json" } : {}),
      ...init?.headers,
    },
    cache: "no-store",
  });

  const text = await res.text();
  let json: unknown;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new SihError(`SIH ${path}: non-JSON response (${res.status})`, res.status);
  }
  if (!res.ok) {
    const err = (json as { error?: string })?.error ?? res.statusText;
    throw new SihError(`SIH ${path}: ${err}`, res.status);
  }
  return json as T;
}

/** GET /get-items — full price/stock map for one app. */
export async function getItems(
  appId: number,
  extended = true,
): Promise<Record<string, SihRawItem>> {
  const data = await call<SihItemsResponse>("/get-items", {
    query: { appId, extended },
  });
  if (!data.success || !data.items) return {};
  const out: Record<string, SihRawItem> = {};
  for (const [name, raw] of Object.entries(data.items)) {
    // The minified variant returns a bare number; extended returns an object.
    out[name] = typeof raw === "number" ? { price: raw, count: 1 } : raw;
  }
  return out;
}

/** GET /project — balance + configured webhook. */
export async function getProject(): Promise<SihProject | null> {
  const data = await call<SihProjectResponse>("/project");
  return data.success ? (data.project ?? null) : null;
}

/** GET /set-webhook?url= — omit url to clear. */
export async function setWebhook(url?: string): Promise<boolean> {
  const data = await call<{ success: boolean }>("/set-webhook", {
    query: { url },
  });
  return data.success;
}

export interface CreateOrderInput {
  item: string;
  amount: number;
  steamId: string;
  token: string;
  appId: number;
  customId?: string;
  test?: boolean;
}

/** POST /create-order. */
export async function createOrder(
  input: CreateOrderInput,
): Promise<SihCreateOrderResponse> {
  return call<SihCreateOrderResponse>("/create-order", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

/** GET /get-order by SIH id or our customId. */
export async function getOrder(
  by: { id: number } | { customId: string },
): Promise<SihOrder | null> {
  const data = await call<SihOrderResponse>("/get-order", { query: by });
  return data.success ? (data.order ?? null) : null;
}

export { SihError };
