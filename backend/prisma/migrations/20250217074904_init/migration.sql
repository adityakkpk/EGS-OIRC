/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `registerUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `sponsor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `registerUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `registeruser` ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    MODIFY `isPaid` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `sponsor` MODIFY `isPaid` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `registerUser_email_key` ON `registerUser`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `sponsor_email_key` ON `sponsor`(`email`);
