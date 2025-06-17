-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Statistic" ADD COLUMN     "averageScore" INTEGER,
ADD COLUMN     "bestScore" INTEGER;
