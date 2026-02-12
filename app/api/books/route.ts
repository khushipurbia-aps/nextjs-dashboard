import { books } from "@/app/data/books";

export async function GET() {
  return Response.json(books);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newBook = {
    id: Date.now(),
    ...body,
  };

  books.push(newBook);

  return Response.json({book: newBook}, { status: 201 });
}
