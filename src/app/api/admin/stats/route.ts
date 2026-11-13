import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth/admin";
import { getDashboardStats, getSyncLogs } from "@/lib/db";

export async function GET(request: Request) {
  const isAuth = await isAdminAuthenticated(request);
  if (!isAuth) {
    return NextResponse.json(
      { error: "Yêu cầu đăng nhập quản trị viên." },
      { status: 401 }
    );
  }

  try {
    const stats = await getDashboardStats();
    const logs = await getSyncLogs(15);
    return NextResponse.json({ success: true, stats, logs });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Lỗi khi lấy dữ liệu thống kê." },
      { status: 500 }
    );
  }
}
