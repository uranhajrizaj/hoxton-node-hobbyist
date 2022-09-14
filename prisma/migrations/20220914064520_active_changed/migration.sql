-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hobbies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Hobbies" ("active", "id", "image", "name") SELECT "active", "id", "image", "name" FROM "Hobbies";
DROP TABLE "Hobbies";
ALTER TABLE "new_Hobbies" RENAME TO "Hobbies";
CREATE UNIQUE INDEX "Hobbies_name_key" ON "Hobbies"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
