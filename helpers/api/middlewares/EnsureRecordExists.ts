import prisma from "@/utils/prisma";

export async function EnsureThemeExists(id: number) {
  try {
    const theme = await prisma.theme.findUnique({
      where: {
        id,
      },
    });
    if (theme) return true;
  } catch (err) {
    return false;
  }
}

export async function EnsureCategorieExists(id: number) {
  try {
    const theme = await prisma.categorie.findUnique({
      where: {
        id,
      },
    });
    if (theme) return true;
  } catch (err) {
    return false;
  }
}

export async function EnsureSiteExists(id: number) {
  try {
    const site = await prisma.siteTouristique.findUnique({
      where: {
        id,
      },
    });
    if (site) return true;
  } catch (err) {
    return false;
  }
}
