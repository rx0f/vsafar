import {
  getAll,
  createByRequest,
} from "@/helpers/api/repositories/siteRepository";
import sendResponse from "@/helpers/api/response/sendResponse";
import sendError from "@/helpers/api/response/sendError";
import { NextRequest } from "next/server";

type siteRequestBody = {
  nom: string;
  description: string;
  moyennes_transport: string;
  localisation: string;
  wilaya: number;
  commune: string;
  debute_access: string;
  fin_access: string;
  documentation_historique?: string;
  themeId: number;
  categorieId: number;
};

export async function GET() {
  const result = await getAll();
  if (!result.success) return sendError(result.message, 500);

  return sendResponse(result.data, result.message);
}

export async function POST(request: NextRequest) {
  const siteReqBody: siteRequestBody = await request.json();
  const result = await createByRequest(siteReqBody);
  if (!result.success) return sendError(result.message, result.status || 401);

  return sendResponse(result.data, result.message);
}
