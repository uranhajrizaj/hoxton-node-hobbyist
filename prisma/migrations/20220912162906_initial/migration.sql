-- CreateTable
CREATE TABLE "Peoples" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Hobbies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "peoplesId" INTEGER NOT NULL,
    CONSTRAINT "Hobbies_peoplesId_fkey" FOREIGN KEY ("peoplesId") REFERENCES "Peoples" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
