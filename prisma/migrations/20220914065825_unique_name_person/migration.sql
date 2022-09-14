-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_People" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "email" TEXT
);
INSERT INTO "new_People" ("email", "id", "name", "picture") SELECT "email", "id", "name", "picture" FROM "People";
DROP TABLE "People";
ALTER TABLE "new_People" RENAME TO "People";
CREATE UNIQUE INDEX "People_name_key" ON "People"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
