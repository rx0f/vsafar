/*
  Warnings:

  - You are about to drop the `actualites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `commentaires` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sites_touristique` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `themes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `utilisateurs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `actualites` DROP FOREIGN KEY `actualites_siteId_fkey`;

-- DropForeignKey
ALTER TABLE `commentaires` DROP FOREIGN KEY `commentaires_siteId_fkey`;

-- DropForeignKey
ALTER TABLE `commentaires` DROP FOREIGN KEY `commentaires_utilisateurId_fkey`;

-- DropForeignKey
ALTER TABLE `medias` DROP FOREIGN KEY `medias_siteId_fkey`;

-- DropForeignKey
ALTER TABLE `sites_touristique` DROP FOREIGN KEY `sites_touristique_categorieId_fkey`;

-- DropForeignKey
ALTER TABLE `sites_touristique` DROP FOREIGN KEY `sites_touristique_themeId_fkey`;

-- DropForeignKey
ALTER TABLE `utilisateurs` DROP FOREIGN KEY `utilisateurs_roleId_fkey`;

-- DropTable
DROP TABLE `actualites`;

-- DropTable
DROP TABLE `categories`;

-- DropTable
DROP TABLE `commentaires`;

-- DropTable
DROP TABLE `medias`;

-- DropTable
DROP TABLE `roles`;

-- DropTable
DROP TABLE `sites_touristique`;

-- DropTable
DROP TABLE `themes`;

-- DropTable
DROP TABLE `utilisateurs`;

-- CreateTable
CREATE TABLE `Theme` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Theme_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categorie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Categorie_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_role_key`(`role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteTouristique` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `moyennes_transport` VARCHAR(191) NOT NULL,
    `localisation` VARCHAR(191) NOT NULL,
    `wilaya` INTEGER NOT NULL,
    `commune` VARCHAR(191) NOT NULL,
    `debute_access` DATETIME(3) NOT NULL,
    `fin_access` DATETIME(3) NOT NULL,
    `documentation_historique` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `themeId` INTEGER NOT NULL,
    `categorieId` INTEGER NOT NULL,

    UNIQUE INDEX `SiteTouristique_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Utilisateur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `Utilisateur_email_key`(`email`),
    UNIQUE INDEX `Utilisateur_nom_prenom_key`(`nom`, `prenom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `media_type` ENUM('photo', 'video') NOT NULL,
    `media_lien` VARCHAR(191) NOT NULL,
    `siteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Actualite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `centre_circle` VARCHAR(191) NOT NULL,
    `rayon` DOUBLE NOT NULL,
    `siteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commentaire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contenu` TEXT NOT NULL,
    `utilisateurId` INTEGER NOT NULL,
    `siteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SiteTouristique` ADD CONSTRAINT `SiteTouristique_themeId_fkey` FOREIGN KEY (`themeId`) REFERENCES `Theme`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SiteTouristique` ADD CONSTRAINT `SiteTouristique_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Categorie`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Utilisateur` ADD CONSTRAINT `Utilisateur_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `SiteTouristique`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Actualite` ADD CONSTRAINT `Actualite_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `SiteTouristique`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commentaire` ADD CONSTRAINT `Commentaire_utilisateurId_fkey` FOREIGN KEY (`utilisateurId`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commentaire` ADD CONSTRAINT `Commentaire_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `SiteTouristique`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
