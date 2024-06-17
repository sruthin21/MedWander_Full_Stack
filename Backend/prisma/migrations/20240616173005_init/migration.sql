-- CreateTable
CREATE TABLE "FormA" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "PhoneNumber" INTEGER NOT NULL,

    CONSTRAINT "FormA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormB" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "PhoneNumber" INTEGER NOT NULL,

    CONSTRAINT "FormB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormA_Name_key" ON "FormA"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "FormA_PhoneNumber_key" ON "FormA"("PhoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "FormB_Name_key" ON "FormB"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "FormB_PhoneNumber_key" ON "FormB"("PhoneNumber");
