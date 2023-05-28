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
