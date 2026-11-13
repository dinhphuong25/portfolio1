import { getCloudflareContext } from "@opennextjs/cloudflare";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

async function getAdminSecretKey(): Promise<string> {
  if (process.env.ADMIN_SECRET_KEY) {
    return process.env.ADMIN_SECRET_KEY;
  }
  try {
    const ctx = await getCloudflareContext();
    if (ctx?.env?.ADMIN_SECRET_KEY) {
      return ctx.env.ADMIN_SECRET_KEY;
    }
  } catch {
    // Edge context not available
  }
  // Default fallback for development
  return "dinhphuong_admin_secret_key_2026_secure";
}

// Convert string to Uint8Array
function strToUint8(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// Convert ArrayBuffer to Hex string
function bufToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Generate HMAC SHA-256 signature using Web Crypto API
async function signMessage(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const keyData = enc.encode(secret);
  const key = await crypto.subtle.importKey(
    "raw",
    keyData as any,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message) as any);
  return bufToHex(signature);
}

// Verify HMAC SHA-256 signature
async function verifySignature(message: string, signature: string, secret: string): Promise<boolean> {
  const expectedSig = await signMessage(message, secret);
  return expectedSig === signature;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const secret = await getAdminSecretKey();
  return password.trim() === secret.trim();
}

export async function createAdminSessionToken(): Promise<string> {
  const secret = await getAdminSecretKey();
  const timestamp = Date.now().toString();
  const signature = await signMessage(timestamp, secret);
  return `${timestamp}.${signature}`;
}

export async function verifyAdminSessionToken(token?: string | null): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Check expiration
  if (Date.now() - timestamp > SESSION_DURATION_MS) {
    return false;
  }

  const secret = await getAdminSecretKey();
  return verifySignature(timestampStr, signature, secret);
}

export function extractCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const matches = cookieHeader.split(";");
  for (const match of matches) {
    const [k, v] = match.trim().split("=");
    if (k === name) return decodeURIComponent(v);
  }
  return null;
}

export async function isAdminAuthenticated(request: Request): Promise<boolean> {
  // Check Authorization Bearer header
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const isValid = await verifyAdminSessionToken(token);
    if (isValid) return true;
  }

  // Check Cookie
  const cookieHeader = request.headers.get("cookie");
  const sessionToken = extractCookie(cookieHeader, COOKIE_NAME);
  return verifyAdminSessionToken(sessionToken);
}

export { COOKIE_NAME };
