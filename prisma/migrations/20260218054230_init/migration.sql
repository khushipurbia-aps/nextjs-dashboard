-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "bookName" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "categories" TEXT[],
    "publishedOn" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
