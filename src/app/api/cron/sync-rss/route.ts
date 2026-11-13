import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { syncAllActiveSources } from "@/lib/rss/aggregator";

async function verifyCronSecret(request: Request): Promise<boolean> {
  let expectedSecret = process.env.CRON_SECRET;
  try {
    const ctx = await getCloudflareContext();
    if (ctx?.env?.CRON_SECRET) {
      expectedSecret = ctx.env.CRON_SECRET;
    }
  } catch {
    //
  }

  // If no secret configured, allow with default or require secret
  if (!expectedSecret) {
    expectedSecret = "dinhphuong_cron_secret_2026";
  }

  const { searchParams } = new URL(request.url);
  const secretParam = searchParams.get("secret");
  if (secretParam && secretParam === expectedSecret) return true;

  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader === `Bearer ${expectedSecret}`) return true;

  return false;
}

export async function GET(request: Request) {
  const isAuthorized = await verifyCronSecret(request);
  if (!isAuthorized) {
    return NextResponse.json({ error: "Không được phép truy cập cron." }, { status: 401 });
  }

  try {
    const result = await syncAllActiveSources();
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Lỗi khi chạy cron sync RSS." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}
