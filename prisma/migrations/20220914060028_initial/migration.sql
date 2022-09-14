-- CreateTable
CREATE TABLE "People" (
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
    "active" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "_HobbiesToPeople" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_HobbiesToPeople_A_fkey" FOREIGN KEY ("A") REFERENCES "Hobbies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_HobbiesToPeople_B_fkey" FOREIGN KEY ("B") REFERENCES "People" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_HobbiesToPeople_AB_unique" ON "_HobbiesToPeople"("A", "B");

-- CreateIndex
CREATE INDEX "_HobbiesToPeople_B_index" ON "_HobbiesToPeople"("B");
