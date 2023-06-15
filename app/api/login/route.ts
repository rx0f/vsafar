import { authenticateByRequest } from "@/helpers/api/repositories/userRepository";
import sendResponse from "@/helpers/api/response/sendResponse";
import sendError from "@/helpers/api/response/sendError";
type LoginRequestBody = {
  email: string;
  password: string;
};

export async function POST(request: Request) {
  const body: LoginRequestBody = await request.json();

  const result = await authenticateByRequest(body);
  console.log("RESULTING: ", result )
  if (result.success) return sendResponse(result.data, result.message);

  return sendError(result.message);
}
