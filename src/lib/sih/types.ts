/** Raw item as returned by SIH `get-items` (extended). Prices are in USD. */
export interface SihRawItem {
  price: number;
  count: number;
  image?: string;
  color?: string;
  phase?: string;
  market?: string;
  sell?: number;
  steam?: number;
}

export interface SihItemsResponse {
  success: boolean;
  items?: Record<string, SihRawItem | number>;
  error?: string;
}

export interface SihProject {
  id: number;
  name: string;
  balance: number;
  webhook?: string;
}

export interface SihProjectResponse {
  success: boolean;
  project?: SihProject;
  error?: string;
}

export type SihOrderStatus =
  | "created"
  | "processing"
  | "sent"
  | "finished"
  | "failed"
  | "penalized";

export interface SihCreateOrderResponse {
  success: boolean;
  id?: number;
  balance?: number;
  error?: string;
  /** Present on 409 duplicate customId. */
  order?: SihOrder;
}

export interface SihOrder {
  id: number;
  customId?: string;
  status: SihOrderStatus;
  item?: string;
  amount?: number;
  steamId?: string;
  error?: string;
  protection?: { status?: string };
}

export interface SihOrderResponse {
  success: boolean;
  order?: SihOrder;
  error?: string;
}

/** Webhook body SIH POSTs on order-status changes (mirrors get-order). */
export interface SihWebhookPayload {
  id: number;
  customId?: string;
  status: SihOrderStatus;
  item?: string;
  amount?: number;
  error?: string;
}
