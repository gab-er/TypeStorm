/*
  Warnings:

  - You are about to alter the column `averageWpm` on the `Statistic` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "Statistic" ALTER COLUMN "averageWpm" SET DATA TYPE DECIMAL(65,30);
