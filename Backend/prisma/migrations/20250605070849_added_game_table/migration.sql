-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "wpm" INTEGER NOT NULL,
    "accuracy" DECIMAL(3,2) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
