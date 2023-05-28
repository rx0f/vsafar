import { addCategorieValidation } from "@/helpers/api/validation/dataValidation";
import { EnsureCategorieExists } from "@/helpers/api/middlewares/EnsureRecordExists";
import prisma from "@/utils/prisma";

type CategorieRequest = {
  nom: string;
};

type ResponseObject = {
  success: boolean;
  message: string;
  data?: any;
};

export async function getAll() {
  let response: ResponseObject = {
    success: true,
    message: "Les thèmes ont été récupérés avec succès",
    data: [],
  };

  try {
    const themes = await prisma.categorie.findMany();
    response.data = themes;

    return response;
  } catch (err: any) {
    console.log(err.message);
    response.success = false;
    response.message = "quelque chose s'est mal passé";

    return response;
  }
}

export async function createByRequest(req: CategorieRequest) {
  let response: ResponseObject = {
    success: true,
    message: "Le theme a été créé avec succès",
    data: [],
  };

  if (!addCategorieValidation(req)) {
    response.success = false;
    response.message = "Erreur de validation";

    return response;
  }
  try {
    const theme = await prisma.categorie.create({
      data: {
        nom: req.nom,
      },
    });
    response.data = theme;

    return response;
  } catch (err) {
    response.success = false;
    response.message = "quelque chose s'est mal passé";

    return response;
  }
}

export async function updateById(req: CategorieRequest, id: number) {
  let response: ResponseObject = {
    success: true,
    message: "Le thème a été mis à jour avec succès",
    data: [],
  };

  const themeExists = await EnsureCategorieExists(id);
  if (!themeExists) {
    response.success = false;
    response.message = "Le thème n'a pas été trouvé";

    return response;
  }

  try {
    const updatedTheme = await prisma.categorie.update({
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
  const themeExists = await EnsureCategorieExists(id);
  if (!themeExists) {
    response.success = false;
    response.message = "Le thème n'a pas été trouvé";

    return response;
  }

  try {
    const deletedThem = await prisma.categorie.delete({
      where: {
        id,
      },
    });
    response.data = deletedThem;

    return response;
  } catch (err) {
    response.success = false;
    response.message = "quelque chose s'est mal passé";

    return response;
  }
}
