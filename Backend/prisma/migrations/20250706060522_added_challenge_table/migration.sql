-- CreateTable
CREATE TABLE "Challenge" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "wpm" DECIMAL(5,2) NOT NULL,
    "accuracy" DECIMAL(5,4) NOT NULL,
    "errors" INTEGER NOT NULL DEFAULT 0,
    "playedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_uid_key" ON "Challenge"("uid");

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
