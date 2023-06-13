/*
  Warnings:

  - Changed the type of `debute_access` on the `SiteTouristique` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fin_access` on the `SiteTouristique` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `SiteTouristique` DROP COLUMN `debute_access`,
    ADD COLUMN `debute_access` INTEGER NOT NULL,
    DROP COLUMN `fin_access`,
    ADD COLUMN `fin_access` INTEGER NOT NULL;
