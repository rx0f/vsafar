import {
  createByRequest,
  getAll,
} from "@/helpers/api/repositories/categorieRepository";
import { NextRequest } from "next/server";
import sendError from "@/helpers/api/response/sendError";
import sendResponse from "@/helpers/api/response/sendResponse";

type CategorieRequestBody = {
  nom: string;
};

export async function GET() {
  const result = await getAll();
  if (!result.success) return sendError(result.message, result.status);

  return sendResponse(result.data, result.message);
}

export async function POST(request: NextRequest) {
  const requestBody: CategorieRequestBody = await request.json();

  const result = await createByRequest(requestBody);
  if (!result.success) return sendError(result.message);

  return sendResponse(result.data, result.message);
}
