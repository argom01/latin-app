-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `token_version` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Noun` (
    `id` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `declension` VARCHAR(191) NOT NULL,
    `n_sg` VARCHAR(191) NOT NULL,
    `g_sg` VARCHAR(191) NOT NULL,
    `d_sg` VARCHAR(191) NOT NULL,
    `acc_sg` VARCHAR(191) NOT NULL,
    `ab_sg` VARCHAR(191) NOT NULL,
    `voc_sg` VARCHAR(191) NOT NULL,
    `n_pl` VARCHAR(191) NOT NULL,
    `g_pl` VARCHAR(191) NOT NULL,
    `d_pl` VARCHAR(191) NOT NULL,
    `acc_pl` VARCHAR(191) NOT NULL,
    `ab_pl` VARCHAR(191) NOT NULL,
    `voc_pl` VARCHAR(191) NOT NULL,
    `translation` VARCHAR(191) NOT NULL,
    `def` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chapter` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `bookId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
