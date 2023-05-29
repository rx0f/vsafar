import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./utils/jwt";
import sendError from "./helpers/api/response/sendError";

export async function middleware(request: NextRequest) {
  const requiredAuthRoutes: string[] = ["/api/admin", "/api/utilisateur/site"];
  const requiredAdminRoutes: string[] = ["/api/admin"];

  let includesAuth = false;
  requiredAuthRoutes.forEach((route: string) => {
    if (request.nextUrl.pathname !== "/api/utilisateur/site") {
      if (request.nextUrl.pathname.includes(route)) includesAuth = true;
    }
  });

  if (includesAuth) {
    const accessToken = request.headers.get("authorization");
    const verifiedJWT = await verifyJwt(accessToken as any);
    if (!verifiedJWT) return sendError("Tu dois être authentifie !", 401);
  }

  let includesAdmin = false;
  requiredAdminRoutes.forEach((route: string) => {
    if (request.nextUrl.pathname.includes(route)) includesAdmin = true;
  });

  if (includesAdmin) {
    const accessToken = request.headers.get("authorization");
    const user = await verifyJwt(accessToken as any);

    if (user && user.role !== "administrateur")
      return sendError("Seulement l'administrateur peut faire ca!", 403);
  }
  return NextResponse.next();
}
