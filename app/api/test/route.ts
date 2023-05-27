import type { NextRequest } from "next/server";
import { verifyJwt } from "@/utils/jwt";
export async function GET(request: NextRequest) {
  const accessToken = request.headers.get("authorization");
  const user = await verifyJwt(accessToken as any);
  return new Response(JSON.stringify(user));
}
