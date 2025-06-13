/*
  Warnings:

  - You are about to drop the column `accuracy` on the `Statistic` table. All the data in the column will be lost.
  - You are about to drop the column `wpm` on the `Statistic` table. All the data in the column will be lost.
  - Added the required column `averageAccuracy` to the `Statistic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageWpm` to the `Statistic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Statistic" DROP COLUMN "accuracy",
DROP COLUMN "wpm",
ADD COLUMN     "averageAccuracy" DECIMAL(3,2) NOT NULL,
ADD COLUMN     "averageWpm" INTEGER NOT NULL;
