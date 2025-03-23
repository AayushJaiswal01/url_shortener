-- CreateTable
CREATE TABLE "UrlMapping" (
    "id" TEXT NOT NULL,
    "longUrl" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "customAlias" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usageCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UrlMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UrlMapping_longUrl_key" ON "UrlMapping"("longUrl");

-- CreateIndex
CREATE UNIQUE INDEX "UrlMapping_shortCode_key" ON "UrlMapping"("shortCode");
