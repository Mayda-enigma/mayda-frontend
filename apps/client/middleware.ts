import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_PATHS = ["/login", "/signup"]

export function middleware(request: NextRequest) {
  const token = request.cookies.get("mayda_token")?.value
  const { pathname } = request.nextUrl

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next()
  }

  if (!token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg).*)"],
}
