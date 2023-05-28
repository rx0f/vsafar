import EnsureIsAdmin from "@/helpers/api/middlewares/EnsureIdAdminMIddleware";
import sendError from "@/helpers/api/response/sendError";
import { verifyJwt } from "@/utils/jwt";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const accessToken = request.headers.get("authorization");
  const user = await verifyJwt(accessToken as any);
  const isAdmin = await EnsureIsAdmin(user);
  if (!isAdmin)
    return sendError("Seulement l'administrateur peut fait ca!", 403);
  return new Response(JSON.stringify("SUII"));
}
