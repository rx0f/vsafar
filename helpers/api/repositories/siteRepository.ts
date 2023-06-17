import prisma from "@/utils/prisma";
import { categorieSeed } from "./categorieRepository";
import { themeSeed } from "./themeRepository";
import {
  commentValidation,
  siteValidation,
} from "@/helpers/api/validation/dataValidation";
import {
  EnsureCategorieExists,
  EnsureThemeExists,
  EnsureSiteExists,
} from "../middlewares/EnsureRecordExists";
import randomNumber from "@/utils/randomNumber";
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
  media_lien?: string;
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
        medias: true,
        actualites: true,
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
      media_lien,
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
    await prisma.media.create({
      data: {
        media_type: "photo",
        media_lien: req.media_lien as any,
        site: {
          connect: {
            id: createdSite.id as any,
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

export async function seed() {
  let response: ResponseObject = {
    success: true,
    message: "Seed success",
    data: [],
  };
  const categorieSeeders = await prisma.categorie.findMany();
  if (categorieSeeders.length < 1) await categorieSeed();

  const themeSeeders = await prisma.theme.findMany();
  if (themeSeeders.length < 1) await themeSeed();

  try {
    let site = await prisma.siteTouristique.create({
      data: {
        nom: "Tikjda",
        description:
          "Tikjda est un site touristique situé à l'est de la wilaya de Bouira, à 1 478 m d'altitude au cœur du massif montagneux du Djurdjura et siège administratif du Parc National et Biosphère de l'UNESCO du même nom. Tikjda est connue à l'échelle nationale mais encore peu à l'échelle internationale mis à part des résidents étrangers en Algérie. Tikjda est aussi une structure réservée, outre le tourisme, pour les pratiquants d'arts martiaux, une ancienne tradition, outre bien entendu le sport phare de la station : le ski, dont la saison s'étale de décembre à avril.",
        moyennes_transport: "Bus",
        localisation: "36.46640976272876,4.12465415370674",
        wilaya: 10,
        commune: "El Asnam",
        debute_access: 8,
        fin_access: 20,
        themeId: themeSeeders[randomNumber(0, themeSeeders.length - 1)].id,
        categorieId:
          categorieSeeders[randomNumber(0, categorieSeeders.length - 1)].id,
      },
    });
    const tikjdaPhoto = await prisma.media.create({
      data: {
        media_type: "photo",
        media_lien:
          "https://i.pinimg.com/originals/52/ff/36/52ff36d7179188795f584aedb3f3e08c.jpg",
        site: {
          connect: {
            id: site.id as any,
          },
        },
      },
    });

    site = await prisma.siteTouristique.create({
      data: {
        nom: "Oued El Bared",
        description:
          "Oued El Barad est une commune de la wilaya de Sétif, située en zone montagneuse dans les Babors en Petite Kabylie en Algérie.",
        moyennes_transport: "Bus",
        localisation: "36.496692140502624,5.419124226809203",
        wilaya: 19,
        commune: "Oued El Bared",
        debute_access: 8,
        fin_access: 16,
        themeId: themeSeeders[randomNumber(0, themeSeeders.length - 1)].id,
        categorieId:
          categorieSeeders[randomNumber(0, categorieSeeders.length - 1)].id,
      },
    });
    const ouedElBaredPhoto = await prisma.media.create({
      data: {
        media_type: "photo",
        media_lien:
          "https://upload.wikimedia.org/wikipedia/commons/5/5e/Cascades_de_Oued_El_Bared_-_Setif_%D8%B4%D9%84%D8%A7%D9%84%D8%A7%D8%AA_%D9%88%D8%A7%D8%AF_%D8%A7%D9%84%D8%A8%D8%A7%D8%B1%D8%AF_-_%D8%B3%D8%B7%D9%8A%D9%81_%2848374564122%29.jpg",
        site: {
          connect: {
            id: site.id as any,
          },
        },
      },
    });
    await prisma.siteTouristique.create({
      data: {
        nom: "MÉMORIAL DU MARTYR",
        description:
          "Le mémorial du Martyr, sanctuaire du Martyr ou Maqam Echahid est un monument aux morts surplombant la ville d'Alger, érigé en 1982 à l'occasion du 20ᵉ anniversaire de l'indépendance de l'Algérie, en mémoire des chahids, les combattants de la guerre d'indépendance algérienne morts pour la libération du pays.",
        moyennes_transport: "Bus",
        localisation: "36.745701779799774,3.06975602345853",
        wilaya: 16,
        commune: "Alger",
        debute_access: 8,
        fin_access: 16,
        themeId: themeSeeders[randomNumber(0, themeSeeders.length - 1)].id,
        categorieId:
          categorieSeeders[randomNumber(0, categorieSeeders.length - 1)].id,
      },
    });

    const makamEchahidPhoto = await prisma.media.create({
      data: {
        media_type: "photo",
        media_lien:
          "https://live.staticflickr.com/6079/6080215795_0b130bdf43_b.jpg",
        site: {
          connect: {
            id: site.id as any,
          },
        },
      },
    });
  } catch (err: any) {
    console.log(err.message);
    response.success = false;
    response.message = "les seeds existent deja";
    response.data = [];

    return response;
  }

  return response;
}
