/*
  Warnings:

  - The `status` column on the `sys_dept` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `sys_dict_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `sys_dict_type` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `sys_role` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `sys_user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "sys_dept" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "sys_dict_data" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "sys_dict_type" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "sys_role" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "sys_user" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT -1;

-- DropEnum
DROP TYPE "Status";
