/*
  Warnings:

  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LoginMethod" AS ENUM ('PASSWORD', 'SSO', 'OAUTH', 'REFRESH_TOKEN', 'MAGIC_LINK');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "LoginRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "method" "LoginMethod" NOT NULL DEFAULT 'PASSWORD',
    "success" BOOLEAN NOT NULL DEFAULT true,
    "sessionId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LoginRecord_userId_idx" ON "LoginRecord"("userId");

-- CreateIndex
CREATE INDEX "LoginRecord_createdAt_idx" ON "LoginRecord"("createdAt");

-- AddForeignKey
ALTER TABLE "LoginRecord" ADD CONSTRAINT "LoginRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
