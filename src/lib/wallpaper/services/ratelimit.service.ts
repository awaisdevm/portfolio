export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

// NOTE: This is an in-memory store. 
// In a serverless environment like Vercel, this is not persistent 
// across different execution instances. 
// For production, replace this with Upstash Redis or a similar persistent store.
const store = new Map<string, { count: number; expires: number }>();

export class RateLimitService {
  private limit: number;
  private windowMs: number;

  constructor(limit = 50, windowMs = 3600000) { // Default: 50 requests per hour
    this.limit = Number(process.env.RATE_LIMIT_MAX) || limit;
    this.windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || windowMs;
  }

  async check(identifier: string): Promise<RateLimitResult> {
    const now = Date.now();
    const record = store.get(identifier);

    if (!record || now > record.expires) {
      const expires = now + this.windowMs;
      store.set(identifier, { count: 1, expires });
      return { success: true, remaining: this.limit - 1, reset: expires };
    }

    if (record.count >= this.limit) {
      return { success: false, remaining: 0, reset: record.expires };
    }

    record.count += 1;
    return { success: true, remaining: this.limit - record.count, reset: record.expires };
  }
}

export const rateLimitService = new RateLimitService();
