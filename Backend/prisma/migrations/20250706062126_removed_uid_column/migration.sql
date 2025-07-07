/*
  Warnings:

  - You are about to drop the column `uid` on the `Challenge` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Challenge_uid_key";

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "uid";
