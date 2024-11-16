/*
  Warnings:

  - Added the required column `fullname` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "fullname" TEXT NOT NULL;
