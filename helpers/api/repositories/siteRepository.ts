import prisma from "@/utils/prisma";
import {
  commentValidation,
  siteValidation,
} from "@/helpers/api/validation/dataValidation";
import {
  EnsureCategorieExists,
  EnsureThemeExists,
  EnsureSiteExists,
} from "../middlewares/EnsureRecordExists";
import { verifyJwt } from "@/utils/jwt";
type ResponseObject = {
  success: boolean;
  message: string;
  data?: any;
  status?: number;
};

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

export async function getAll() {
  let response: ResponseObject = {
    success: true,
    message: "Les sites ont été récupérés avec succès",
    data: [],
  };

  try {
    const sites = await prisma.siteTouristique.findMany({
      include: {
        theme: true,
        categorie: true,
        commentaires: true,
      },
    });
    response.data = sites;

    return response;
  } catch (err: any) {
    console.log(err.message);
    response.success = false;
    response.status = 500;
    response.message = "quelque chose s'est mal passé";

    return response;
  }
}

export async function createByRequest(req: siteRequestBody) {
  let response: ResponseObject = {
    success: true,
    message: "Les sites a été cree avec succès",
    data: [],
  };
  if (!siteValidation(req)) {
    response.success = false;
    response.message = "Erreur de validation";

    return response;
  }

  const themeExists = await EnsureThemeExists(+req.themeId);
  if (!themeExists) {
    response.success = false;
    response.message = "Le theme n'existe pas!";

    return response;
  }

  const categorieExists = await EnsureCategorieExists(+req.categorieId);
  if (!categorieExists) {
    response.success = false;
    response.message = "La categorie n'existe pas!";

    return response;
  }

  try {
    const {
      nom,
      description,
      moyennes_transport,
      wilaya,
      commune,
      localisation,
      debute_access,
      fin_access,
      documentation_historique,
      themeId,
      categorieId,
    } = req;
    const createdSite = await prisma.siteTouristique.create({
      data: {
        nom,
        description,
        moyennes_transport,
        wilaya,
        commune,
        localisation,
        debute_access: +debute_access,
        fin_access: +fin_access,
        documentation_historique,
        theme: {
          connect: {
            id: themeId,
          },
        },
        categorie: {
          connect: {
            id: categorieId,
          },
        },
      },
    });
    response.data = createdSite;

    return response;
  } catch (err: any) {
    console.log(err.message);
    response.success = false;
    response.status = 500;
    response.message = "quelque chose s'est mal passé";

    return response;
  }
}

export async function updateById(req: siteRequestBody, id: number) {
  let response: ResponseObject = {
    success: true,
    message: "Les sites a été ajoure avec succès",
    data: [],
  };
  const siteExists = await EnsureSiteExists(id);
  if (!siteExists) {
    response.success = false;
    response.message = "Le site n'existe pas!";

    return response;
  }
  if (!siteValidation(req)) {
    response.success = false;
    response.message = "Erreur de validation";

    return response;
  }

  const themeExists = await EnsureThemeExists(+req.themeId);
  if (!themeExists) {
    response.success = false;
    response.message = "Le theme n'existe pas!";

    return response;
  }

  const categorieExists = await EnsureCategorieExists(+req.categorieId);
  if (!categorieExists) {
    response.success = false;
    response.message = "La categorie n'existe pas!";

    return response;
  }

  try {
    const {
      nom,
      description,
      moyennes_transport,
      wilaya,
      commune,
      localisation,
      debute_access,
      fin_access,
      documentation_historique,
      themeId,
      categorieId,
    } = req;
    const updatedSite = await prisma.siteTouristique.update({
      where: {
        id,
      },
      data: {
        nom,
        description,
        moyennes_transport,
        wilaya,
        commune,
        localisation,
        debute_access: +debute_access,
        fin_access: +fin_access,
        documentation_historique,
        theme: {
          connect: {
            id: themeId,
          },
        },
        categorie: {
          connect: {
            id: categorieId,
          },
        },
      },
    });
    response.data = updatedSite;

    return response;
  } catch (err: any) {
    console.log(err.message);
    response.success = false;
    response.status = 500;
    response.message = "quelque chose s'est mal passé";

    return response;
  }
}

export async function deleteById(id: number) {
  let response: ResponseObject = {
    success: true,
    message: "Les sites a été supprime avec succès",
    data: [],
  };
  const siteExists = await EnsureSiteExists(id);
  if (!siteExists) {
    response.success = false;
    response.message = "Le site n'existe pas!";

    return response;
  }

  try {
    const deleteSite = await prisma.siteTouristique.delete({
      where: {
        id,
      },
    });

    return response;
  } catch (err: any) {
    console.log(err.message);
    response.success = false;
    response.status = 500;
    response.message = "quelque chose s'est mal passé";

    return response;
  }
}

type commentRequestBody = {
  contenu: string;
};
export async function commentById(
  req: commentRequestBody,
  id: number,
  accessToken: string
) {
  let response: ResponseObject = {
    success: true,
    message: "Votre commentaire a été enregistré avec succès",
    data: [],
  };
  const siteExists = await EnsureSiteExists(id);
  if (!siteExists) {
    response.success = false;
    response.message = "Le site n'existe pas!";

    return response;
  }

  if (!commentValidation(req)) {
    response.success = false;
    response.message = "Erreur de validation";

    return response;
  }
  const user = await verifyJwt(accessToken as any);

  // this condition will always be true (as the user is already verified in the middleware)
  // It is set to avaoid typescript warning `user can be null`
  if (user) {
    try {
      const newComment = await prisma.commentaire.create({
        data: {
          contenu: req.contenu,
          utilisateur: {
            connect: {
              id: user.id as any,
            },
          },
          site: {
            connect: {
              id,
            },
          },
        },
      });
      response.data = newComment;

      return response;
    } catch (err: any) {
      console.log(err.message);
      response.success = false;
      response.status = 500;
      response.message = "quelque chose s'est mal passé";

      return response;
    }
  }

  response.success = false;
  response.message = "quelque chose unattendue est passe!";
  response.status = 500;

  return response;
}
