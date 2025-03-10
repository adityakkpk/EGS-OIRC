/*
  Warnings:

  - The values [NORMAL_ADMIN] on the enum `Admin_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `role` ENUM('SUPER_ADMIN', 'ADMIN') NOT NULL;
