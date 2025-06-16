/*
  Warnings:

  - You are about to drop the column `type` on the `Game` table. All the data in the column will be lost.
  - Added the required column `gamemode` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gamemode" AS ENUM ('SPRINT', 'STANDARD', 'MARATHON');

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "type",
ADD COLUMN     "gamemode" "Gamemode" NOT NULL;

-- CreateTable
CREATE TABLE "Statistic" (
    "id" SERIAL NOT NULL,
    "wpm" INTEGER NOT NULL,
    "bestWpm" INTEGER NOT NULL,
    "accuracy" DECIMAL(3,2) NOT NULL,
    "bestAccuracy" DECIMAL(3,2) NOT NULL,
    "gamemode" "Gamemode" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Statistic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Statistic" ADD CONSTRAINT "Statistic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
