import { NextResponse } from "next/server";
import {
  verifyAdminPassword,
  createAdminSessionToken,
  isAdminAuthenticated,
  COOKIE_NAME,
} from "@/lib/auth/admin";

export async function GET(request: Request) {
  const authenticated = await isAdminAuthenticated(request);
  return NextResponse.json({ authenticated });
}

export async function POST(request: Request) {
  try {
    const { password } = (await request.json()) as { password?: string };

    if (!password) {
      return NextResponse.json(
        { error: "Vui lòng nhập mật khẩu quản trị." },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Mật khẩu quản trị không chính xác." },
        { status: 401 }
      );
    }

    const token = await createAdminSessionToken();

    const response = NextResponse.json({
      success: true,
      message: "Đăng nhập trang quản trị thành công.",
    });

    // Set secure HTTP-only cookie
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Đã xảy ra lỗi khi đăng nhập." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Đã đăng xuất thành công.",
  });

  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
