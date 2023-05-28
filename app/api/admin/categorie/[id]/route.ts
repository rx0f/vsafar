import {
    updateById,
    deleteById,
  } from "@/helpers/api/repositories/categorieRepository";
  import { NextRequest } from "next/server";
  import sendError from "@/helpers/api/response/sendError";
  import sendResponse from "@/helpers/api/response/sendResponse";
  import { revalidatePath } from "next/cache";
  
  type CategorieRequestBody = {
    nom: string;
  };
  
  export async function PUT(request: NextRequest, { params }: any) {
    const requestBody: CategorieRequestBody = await request.json();
  
    const result = await updateById(requestBody, +params.id);
    if (!result.success) return sendError(result.message, 401);
  
    revalidatePath("/api/admin/categorie");
    return sendResponse(result.data, result.message);
  }
  
  export async function DELETE(request: NextRequest, { params }: any) {
    const result = await deleteById(+params.id);
    if (!result.success) return sendError(result.message, 401);
  
    revalidatePath("/api/admin/categorie");
    return sendResponse(result.data, result.message);
  }
  