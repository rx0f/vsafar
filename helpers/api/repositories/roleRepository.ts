import prisma from "@/utils/prisma";

type createRoleRequestBody = {
  role: string;
};

type ResponseObject = {
  success: boolean;
  message: string;
  data?: any;
};

export async function createByRequest(req: createRoleRequestBody) {
  let response: ResponseObject = {
    success: true,
    message: "Le rôle a été créé avec succès",
    data: [],
  };

  const role = await prisma.role.create({
    data: {
      role: req.role,
    },
  });

  response.data = role;

  return response;
}
