import { NextRequest } from "next/server";
import sendError from "@/helpers/api/response/sendError";
import sendResponse from "@/helpers/api/response/sendResponse";
import {
  deleteById,
  updateById,
} from "@/helpers/api/repositories/siteRepository";
import { revalidatePath } from "next/cache";

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

export async function PUT(request: NextRequest, { params }: any) {
  const reqBody: siteRequestBody = await request.json();
  const result = await updateById(reqBody, +params.id);
  if (!result.success) return sendError(result.message);

  revalidatePath("/api/admin/site");
  return sendResponse(result.data, result.message);
}

export async function DELETE(request: NextRequest, { params }: any) {
  const result = await deleteById(+params.id);
  if (!result.success) return sendError(result.message);

  revalidatePath("/api/admin/site");
  return sendResponse(result.data, result.message);
}
