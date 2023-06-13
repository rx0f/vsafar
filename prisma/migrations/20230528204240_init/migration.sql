/*
  Warnings:

  - You are about to drop the column `roleId` on the `Utilisateur` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Utilisateur` DROP FOREIGN KEY `Utilisateur_roleId_fkey`;

-- AlterTable
ALTER TABLE `Utilisateur` DROP COLUMN `roleId`,
    ADD COLUMN `role` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Role`;
