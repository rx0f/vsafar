import sendResponse from "@/helpers/api/response/sendResponse";
import sendError from "@/helpers/api/response/sendError";
import { getAll } from "@/helpers/api/repositories/siteRepository";
export async function GET() {
  const result = await getAll();
  if (!result.success) return sendError(result.message, result.status);
  return sendResponse(result.data, result.message);
}
