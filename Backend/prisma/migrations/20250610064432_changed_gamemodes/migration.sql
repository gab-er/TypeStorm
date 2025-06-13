/*
  Warnings:

  - The values [SPRINT,MARATHON] on the enum `Gamemode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gamemode_new" AS ENUM ('STANDARD', 'TIMED30', 'TIMED60', 'TIMED120');
ALTER TABLE "Game" ALTER COLUMN "gamemode" TYPE "Gamemode_new" USING ("gamemode"::text::"Gamemode_new");
ALTER TABLE "Statistic" ALTER COLUMN "gamemode" TYPE "Gamemode_new" USING ("gamemode"::text::"Gamemode_new");
ALTER TYPE "Gamemode" RENAME TO "Gamemode_old";
ALTER TYPE "Gamemode_new" RENAME TO "Gamemode";
DROP TYPE "Gamemode_old";
COMMIT;
