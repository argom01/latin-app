/*
  Warnings:

  - You are about to drop the column `ab_pl` on the `Noun` table. All the data in the column will be lost.
  - You are about to drop the column `ab_sg` on the `Noun` table. All the data in the column will be lost.
  - You are about to drop the column `acc_pl` on the `Noun` table. All the data in the column will be lost.
  - You are about to drop the column `acc_sg` on the `Noun` table. All the data in the column will be lost.
  - You are about to drop the column `d_pl` on the `Noun` table. All the data in the column will be lost.
  - You are about to drop the column `d_sg` on the `Noun` table. All the data in the column will be lost.
  - You are about to drop the column `g_pl` on the `Noun` table. All the data in the column will be lost.
  - You are about to drop the column `g_sg` on the `Noun` table. All the data in the column will be lost.
  - You are about to drop the column `n_pl` on the `Noun` table. All the data in the column will be lost.
  - You are about to drop the column `n_sg` on the `Noun` table. All the data in the column will be lost.
  - You are about to drop the column `voc_pl` on the `Noun` table. All the data in the column will be lost.
  - You are about to drop the column `voc_sg` on the `Noun` table. All the data in the column will be lost.
  - You are about to drop the column `token_version` on the `User` table. All the data in the column will be lost.
  - Added the required column `abPl` to the `Noun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `abSg` to the `Noun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accPl` to the `Noun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accSg` to the `Noun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dPl` to the `Noun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dSg` to the `Noun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gPl` to the `Noun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gSg` to the `Noun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nPl` to the `Noun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nSg` to the `Noun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vocPl` to the `Noun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vocSg` to the `Noun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Noun` DROP COLUMN `ab_pl`,
    DROP COLUMN `ab_sg`,
    DROP COLUMN `acc_pl`,
    DROP COLUMN `acc_sg`,
    DROP COLUMN `d_pl`,
    DROP COLUMN `d_sg`,
    DROP COLUMN `g_pl`,
    DROP COLUMN `g_sg`,
    DROP COLUMN `n_pl`,
    DROP COLUMN `n_sg`,
    DROP COLUMN `voc_pl`,
    DROP COLUMN `voc_sg`,
    ADD COLUMN `abPl` VARCHAR(191) NOT NULL,
    ADD COLUMN `abSg` VARCHAR(191) NOT NULL,
    ADD COLUMN `accPl` VARCHAR(191) NOT NULL,
    ADD COLUMN `accSg` VARCHAR(191) NOT NULL,
    ADD COLUMN `dPl` VARCHAR(191) NOT NULL,
    ADD COLUMN `dSg` VARCHAR(191) NOT NULL,
    ADD COLUMN `gPl` VARCHAR(191) NOT NULL,
    ADD COLUMN `gSg` VARCHAR(191) NOT NULL,
    ADD COLUMN `nPl` VARCHAR(191) NOT NULL,
    ADD COLUMN `nSg` VARCHAR(191) NOT NULL,
    ADD COLUMN `vocPl` VARCHAR(191) NOT NULL,
    ADD COLUMN `vocSg` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `token_version`,
    ADD COLUMN `tokenVersion` INTEGER NOT NULL DEFAULT 0;
