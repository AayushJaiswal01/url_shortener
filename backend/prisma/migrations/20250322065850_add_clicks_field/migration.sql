/*
  Warnings:

  - You are about to drop the column `customAlias` on the `UrlMapping` table. All the data in the column will be lost.
  - You are about to drop the column `usageCount` on the `UrlMapping` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UrlMapping" DROP COLUMN "customAlias",
DROP COLUMN "usageCount",
ADD COLUMN     "clicks" INTEGER NOT NULL DEFAULT 0;
