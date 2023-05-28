import prisma from "@/utils/prisma";
export default async function EnsureIsAdmin(user: any) {
  const role = await prisma.role.findUnique({
    where: {
      id: user.roleId,
    },
  });
  if (!role || role.role !== "administrateur") return false;
  return true;
}
