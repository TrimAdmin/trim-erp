-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ENABLED', 'DISABLED');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('UNKNOWN', 'MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "sys_user" (
    "id" SERIAL NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteTime" TIMESTAMP(3),
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "sex" "Sex" NOT NULL DEFAULT 'UNKNOWN',

    CONSTRAINT "sys_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_dept" (
    "id" SERIAL NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteTime" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',

    CONSTRAINT "sys_dept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_user_dept" (
    "id" SERIAL NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteTime" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "deptId" INTEGER NOT NULL,

    CONSTRAINT "sys_user_dept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_role" (
    "id" SERIAL NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteTime" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "permission" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "remark" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',

    CONSTRAINT "sys_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_user_role" (
    "id" SERIAL NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteTime" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "sys_user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_dict_type" (
    "id" SERIAL NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteTime" TIMESTAMP(3),
    "label" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "remark" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',

    CONSTRAINT "sys_dict_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_dict_data" (
    "id" SERIAL NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteTime" TIMESTAMP(3),
    "label" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "remark" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "sys_dict_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sys_user_username_key" ON "sys_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "sys_user_email_key" ON "sys_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sys_user_phone_key" ON "sys_user"("phone");

-- CreateIndex
CREATE INDEX "sys_user_username_email_phone_idx" ON "sys_user"("username", "email", "phone");

-- CreateIndex
CREATE INDEX "sys_role_name_idx" ON "sys_role"("name");

-- AddForeignKey
ALTER TABLE "sys_user_dept" ADD CONSTRAINT "sys_user_dept_userId_fkey" FOREIGN KEY ("userId") REFERENCES "sys_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys_user_dept" ADD CONSTRAINT "sys_user_dept_deptId_fkey" FOREIGN KEY ("deptId") REFERENCES "sys_dept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys_user_role" ADD CONSTRAINT "sys_user_role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "sys_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys_user_role" ADD CONSTRAINT "sys_user_role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "sys_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sys_dict_data" ADD CONSTRAINT "sys_dict_data_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "sys_dict_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
