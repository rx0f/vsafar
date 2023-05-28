import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./utils/jwt";
import sendError from "./helpers/api/response/sendError";

export async function middleware(request: NextRequest) {
  const requiredAuthRoutes: string[] = ["/api/admin"];

  if (!requiredAuthRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const accessToken = request.headers.get("authorization");
  const verifiedJWT = await verifyJwt(accessToken as any);
  if (!verifiedJWT) return sendError("Tu dois être authentifie !", 401);

  return NextResponse.next();
}
