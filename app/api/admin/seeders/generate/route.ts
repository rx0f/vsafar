import { seed } from "@/helpers/api/repositories/siteRepository";
import sendError from "@/helpers/api/response/sendError";
import sendResponse from "@/helpers/api/response/sendResponse";
export async function POST() {
  const result = await seed();

  if (!result.success) sendError(result.message, 400);
  return sendResponse(result.data, result.message, 201);
}
