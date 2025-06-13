/*
  Warnings:

  - You are about to alter the column `wpm` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `accuracy` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,4)`.
  - You are about to alter the column `bestWpm` on the `Statistic` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(5,2)`.
  - You are about to alter the column `bestAccuracy` on the `Statistic` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,4)`.
  - You are about to alter the column `averageAccuracy` on the `Statistic` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,4)`.
  - You are about to alter the column `averageWpm` on the `Statistic` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "wpm" SET DATA TYPE DECIMAL(5,2),
ALTER COLUMN "accuracy" SET DATA TYPE DECIMAL(5,4);

-- AlterTable
ALTER TABLE "Statistic" ALTER COLUMN "bestWpm" SET DATA TYPE DECIMAL(5,2),
ALTER COLUMN "bestAccuracy" SET DATA TYPE DECIMAL(5,4),
ALTER COLUMN "averageAccuracy" SET DATA TYPE DECIMAL(5,4),
ALTER COLUMN "averageWpm" SET DATA TYPE DECIMAL(5,2);
