import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./utils/jwt";
import sendError from "./helpers/api/response/sendError";
export async function middleware(request: NextRequest) {
  const requiredAuthRoutes: string[] = [];
  if (!requiredAuthRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  } else {
    const accessToken = request.headers.get("authorization");
    try {
      const verifiedToken = await verifyJwt(accessToken as any);
      return NextResponse.next();
    } catch (err) {
      return sendError("Tu dois être authentifie !", 401);
    }
  }

  return NextResponse.next();
}
