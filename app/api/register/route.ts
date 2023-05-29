import { CreateByRequest } from "@/helpers/api/repositories/userRepository";
import sendResponse from "@/helpers/api/response/sendResponse";
import sendError from "@/helpers/api/response/sendError";

type AuthRequestBody = {
  nom: string;
  prenom: string;
  email: string;
  role: "utilisateur" | "administrateur";
  password: string;
};

export async function POST(request: Request) {
  const body: AuthRequestBody = await request.json();

  const result = await CreateByRequest(body);
  if (result.success) return sendResponse(result.data, result.message);
  return sendError(result.message);
}
