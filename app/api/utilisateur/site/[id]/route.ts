import { NextRequest } from "next/server";
import { commentById } from "@/helpers/api/repositories/siteRepository";
import sendError from "@/helpers/api/response/sendError";
import sendResponse from "@/helpers/api/response/sendResponse";
type commentRequestBody = {
  contenu: string;
};

export async function POST(request: NextRequest, { params }: any) {
  const accessToken = request.headers.get("authorization");
  const reqBody: commentRequestBody = await request.json();
  const result = await commentById(reqBody, +params.id, accessToken as string);

  if (!result.success) return sendError(result.message, result.status);

  return sendResponse(result.data, result.message );
}
