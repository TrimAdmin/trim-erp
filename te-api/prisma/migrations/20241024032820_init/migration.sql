/*
  Warnings:

  - You are about to drop the column `value` on the `sys_dict_type` table. All the data in the column will be lost.
  - Added the required column `key` to the `sys_dict_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sys_dict_type" DROP COLUMN "value",
ADD COLUMN     "key" TEXT NOT NULL;
