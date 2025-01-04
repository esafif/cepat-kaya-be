/*
  Warnings:

  - Changed the type of `role` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'PARTNER');

-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE', 'TRANSFER');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- CreateTable
CREATE TABLE "category" (
    "categoryID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userID" TEXT NOT NULL,
    "type" "CategoryType" NOT NULL,
    "icon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("categoryID")
);

-- CreateTable
CREATE TABLE "account" (
    "accountID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("accountID")
);

-- CreateTable
CREATE TABLE "transaction" (
    "transactionID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "categoryID" TEXT NOT NULL,
    "accountID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "note" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("transactionID")
);

-- CreateTable
CREATE TABLE "budget" (
    "budgetID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "limit" DOUBLE PRECISION NOT NULL,
    "spent" DOUBLE PRECISION NOT NULL,
    "categoryID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_pkey" PRIMARY KEY ("budgetID")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE INDEX "category_userID_idx" ON "category"("userID");

-- CreateIndex
CREATE INDEX "account_userID_idx" ON "account"("userID");

-- CreateIndex
CREATE INDEX "transaction_userID_idx" ON "transaction"("userID");

-- CreateIndex
CREATE INDEX "budget_userID_idx" ON "budget"("userID");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
