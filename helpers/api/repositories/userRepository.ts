import { signJwtAccessToken } from "@/utils/jwt";
import {
  registerDataValidation,
  loginDataValidation,
} from "../validation/dataValidation";
import prisma from "@/utils/prisma";
import * as bcrypt from "bcrypt";
type RegisterRequestBody = {
  nom: string;
  prenom: string;
  email: string;
  role: "utilisateur" | "administrateur";
  password: string;
};

type ResponseObject = {
  success: boolean;
  message: string;
  data?: any;
  status?: number;
};

type LoginRequestBody = {
  email: string;
  password: string;
};

export async function CreateByRequest(req: RegisterRequestBody) {
  let response: ResponseObject = { success: true, message: "", data: [] };

  if (!registerDataValidation(req)) {
    response.success = false;
    response.message = "Erreur de validations";
    response.data = [];

    return response;
  }
  try {
    const user = await prisma.utilisateur.create({
      data: {
        nom: req.nom,
        prenom: req.prenom,
        email: req.email,
        password: await bcrypt.hash(req.password, 10),
        role: req.role as any,
      },
    });

    const { password, ...result } = user;
    response.message = "L'utilisateur a été créé avec succès";
    response.data = result;

    return response;
  } catch (err: any) {
    console.log(err.message);
    response.success = false;
    response.message = "quelque chose s'est mal passé";

    return response;
  }
}

export async function authenticateByRequest(req: LoginRequestBody) {
  let response: ResponseObject = { success: true, message: "", data: [] };

  if (!loginDataValidation(req)) {
    response.success = false;
    response.message = "Erreur de validation";
    response.data = [];

    return response;
  }
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
