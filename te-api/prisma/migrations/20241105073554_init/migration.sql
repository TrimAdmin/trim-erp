/*
  Warnings:

  - You are about to drop the column `isDefault` on the `sys_user` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'DEFAULT';

-- AlterTable
ALTER TABLE "sys_user" DROP COLUMN "isDefault";
