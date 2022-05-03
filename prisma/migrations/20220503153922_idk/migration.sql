/*
  Warnings:

  - A unique constraint covering the columns `[nSg]` on the table `Noun` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX `Noun_nSg_key` ON `Noun`(`nSg`);
