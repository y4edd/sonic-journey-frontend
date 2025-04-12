import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("ミドルウェア発動");
  // Cookieから "access_token" を取得（なければ undefined）
  const token = request.cookies.get("access_token")?.value;

  // ログイン制限のあるページ
  const protectedPaths = ["/mypage", "/user"];
  // access_token がない & アクセス先が /mypage から始まる場合
  if (!token && protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    // /login にリダイレクトさせる
    return NextResponse.redirect(new URL("/user/login", request.url));
  }

  // 条件に当てはまらなければそのまま進む（アクセスを許可）
  return NextResponse.next();
}

export const config = {
  matcher: ["/mypage/:path*", "/user/:path*/info", "/user/:path*/edit"],
};
