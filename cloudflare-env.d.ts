/// <reference types="@cloudflare/workers-types" />

declare global {
  interface CloudflareEnv {
    DB?: D1Database;
    ASSETS?: Fetcher;
    GEMINI_API_KEY?: string;
    ADMIN_SECRET_KEY?: string;
    CRON_SECRET?: string;
    RESEND_API_KEY?: string;
    CONTACT_EMAIL?: string;
    FROM_EMAIL?: string;
    EMAIL?: SendEmail;
  }
}

export {};
