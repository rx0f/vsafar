import { addThemeValidation } from "@/helpers/api/validation/dataValidation";
import { EnsureThemeExists } from "@/helpers/api/middlewares/EnsureRecordExists";
import prisma from "@/utils/prisma";

type ThemeRequest = {
  nom: string;
};

type ResponseObject = {
  success: boolean;
  message: string;
  data?: any;
  status?: number;
};

export async function getAll() {
  let response: ResponseObject = {
    success: true,
    message: "Les thèmes ont été récupérés avec succès",
    data: [],
  };

  try {
    const themes = await prisma.theme.findMany();
    response.data = themes;

    return response;
  } catch (err: any) {
    console.log(err.message);
    response.success = false;
    response.message = "quelque chose s'est mal passé";
    response.status = 500;

    return response;
  }
}

export async function createByRequest(req: ThemeRequest) {
  let response: ResponseObject = {
    success: true,
    message: "Le theme a été créé avec succès",
    data: [],
  };

  if (!addThemeValidation(req)) {
    response.success = false;
    response.message = "Erreur de validation";

    return response;
  }
  try {
    const theme = await prisma.theme.create({
      data: {
        nom: req.nom,
      },
    });
    response.data = theme;

    return response;
  } catch (err) {
    response.success = false;
    response.message = "quelque chose s'est mal passé";
    response.status = 500;

    return response;
  }
}

export async function updateById(req: ThemeRequest, id: number) {
  let response: ResponseObject = {
    success: true,
    message: "Le thème a été mis à jour avec succès",
    data: [],
  };

  const themeExists = await EnsureThemeExists(id);
  if (!themeExists) {
    response.success = false;
    response.message = "Le thème n'a pas été trouvé";

    return response;
  }

  try {
    const updatedTheme = await prisma.theme.update({
      where: {
        id,
      },
      data: {
        nom: req.nom,
      },
    });

    response.data = updatedTheme;

    return response;
  } catch (err) {
    response.success = false;
    response.message = "quelque chose s'est mal passé";

    return response;
  }
}

export async function deleteById(id: number) {
  let response: ResponseObject = {
    success: true,
    message: "Le thème a été supprimé avec succès",
    data: [],
  };
  const themeExists = await EnsureThemeExists(id);
  if (!themeExists) {
    response.success = false;
    response.message = "Le thème n'a pas été trouvé";

    return response;
  }

  try {
    const deletedThem = await prisma.theme.delete({
      where: {
        id,
      },
    });
    response.data = deletedThem;

    return response;
  } catch (err) {
    response.success = false;
    response.message = "quelque chose s'est mal passé";
    response.status = 500;

    return response;
  }
}

export async function themeSeed() {
  try {
    await prisma.theme.create({
      data: {
        nom: "histoire",
      },
    });
    await prisma.theme.create({
      data: {
        nom: "nature",
      },
    });

    return true;
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
}
