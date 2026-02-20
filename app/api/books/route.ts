import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const publishedOn = searchParams.get("publishedOn");
  const name = searchParams.get("name")?.trim();
  const categories = searchParams.getAll("categories");
  const sortBy = searchParams.get("sortBy") as "bookName" | "publishedOn" | null;
  const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || "desc";

const where: Prisma.BookWhereInput = {
    ...(publishedOn && {
      publishedOn: {
        gte: new Date(publishedOn),
        lt: new Date(new Date(publishedOn).setDate(new Date(publishedOn).getDate() + 1)),
      },
    }),
    ...(name && {
      bookName: {
        contains: name,
        mode: "insensitive",
      },
    }),
    ...(categories.length > 0 && {
      categories: {
        hasEvery: categories,
      },
    }),
  };

  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const books = await prisma.book.findMany({
    where,
    orderBy: sortBy
  ? { [sortBy]: sortOrder }
  : [{ publishedOn: "desc" }, {id: "desc"}],  

    skip,
    take: limit,
  });

  const totalBooks = await prisma.book.count({
    where,
  });

  return Response.json({ books, totalBooks,   totalPages: Math.ceil(totalBooks / limit), });  
}

export async function POST(request: Request) {
  const body = await request.json()
  const newBook = await prisma.book.create({
    data: {
      bookName: body.bookName,
      author: body.author,
      categories: body.categories,
      publishedOn: new Date(body.publishedOn)
    }
  })
  return Response.json({ book: newBook }, { status: 201 })
}

export async function DELETE(request: Request) {
  const body = await request.json()
  await prisma.book.delete({
    where: {
      id: Number(body.id)
    }
  })
  return Response.json({
    id: Number(body.id),
    message: "Book SuccessFully Deleted"
  })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const updatedBook = await prisma.book.update({
    where: {
      id: Number(body.id)
    },
    data: {
      bookName: body.bookName,
      author: body.author,
      categories: body.categories,
      publishedOn: new Date(body.publishedOn)
    }
  })
  return Response.json({ book: updatedBook })
}


