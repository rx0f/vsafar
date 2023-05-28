import { signJwtAccessToken } from "@/utils/jwt";
import prisma from "@/utils/prisma";
import * as bcrypt from "bcrypt";
type RegisterRequestBody = {
  nom: string;
  prenom: string;
  email: string;
  role: string;
  password: string;
};

type ResponseObject = {
  success: boolean;
  message: string;
  data?: any;
};

type LoginRequestBody = {
  email: string;
  password: string;
};

export async function CreateByRequest(req: RegisterRequestBody) {
  let response: ResponseObject = { success: true, message: "", data: [] };
  const role = await prisma.role.findFirst({
    where: {
      role: req.role,
    },
  });

  if (!role) {
    response.success = false;
    response.message = "Le rôle spécifié ñ'existe pas";
    return response;
  }

  const user = await prisma.utilisateur.create({
    data: {
      nom: req.nom,
      prenom: req.prenom,
      email: req.email,
      password: await bcrypt.hash(req.password, 10),
      roleId: role.id,
    },
  });

  const { password, ...result } = user;
  response.message = "L'utilisateur a été créé avec succès";
  response.data = result;

  return response;
}

export async function authenticateByRequest(req: LoginRequestBody) {
  let response: ResponseObject = { success: true, message: "", data: [] };
  const user = await prisma.utilisateur.findFirst({
    where: {
      email: req.email,
    },
  });

  if (!user) {
    response.success = false;
    response.message = "L'utilisateur n'existe pas !";

    return response;
  }

  if (user && (await bcrypt.compare(req.password, user.password))) {
    const { password, ...userWithoutPassword } = user;
    const accessToken = await signJwtAccessToken(userWithoutPassword);
    const result = {
      ...userWithoutPassword,
      accessToken,
    };
    response.message = "Connexion réussie !";
    response.data = result;

    return response;
  }

  response.success = false;
  response.message = "Informations d'identification erronées";

  return response;
}