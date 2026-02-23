import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"; 

export async function POST(req: Request) {
  try {
    const { books } = await req.json();

    if (!books || !Array.isArray(books)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }

    await prisma.book.createMany({
      data: books.map((book: any) => ({
        bookName: book.bookName.trim(),
        author: book.author.trim(),
        publishedOn: new Date(book.publishedOn),
        categories: book.categories,
      })),
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Import failed" },
      { status: 500 }
    );
  }
}