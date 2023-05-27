import { createByRequest } from "@/helpers/api/repositories/roleRepository";
import sendResponse from "@/helpers/api/response/sendResponse";
type createRoleRequestBody = {
  role: string;
};

export async function POST(request: Request) {
  const body: createRoleRequestBody = await request.json();

  const result = await createByRequest(body);

  return sendResponse(result.data, result.message);
}
