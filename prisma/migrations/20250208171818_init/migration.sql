-- CreateTable
CREATE TABLE "Todo" (
    "Id" SERIAL NOT NULL,
    "Text" VARCHAR NOT NULL,
    "CompletedAt" TIMESTAMP,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("Id")
);
