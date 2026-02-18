import { prisma } from "@/lib/prisma";

export async function GET(){
  const books = await prisma.book.findMany()
  return Response.json(books)
}

export async function POST(request: Request){
  const body = await request.json()
  const newBook = await prisma.book.create({
    data: {
      bookName: body.bookName,
      author: body.author,
      categories: body.categories,
      publishedOn: new Date(body.publishedOn)
    }
  })
  return Response.json({book: newBook}, {status: 201})
}

export async function DELETE(request: Request){
  const body = await request.json()
  await prisma.book.delete({
    where: {
      id: Number(body.id)
    }
  })
  return Response.json({id: Number(body.id), 
  message: "Book SuccessFully Deleted"})
}

export async function PUT(request: Request){
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
 return Response.json({book: updatedBook})
}


// import { books } from "@/app/data/books";

// export async function GET() {
//   return Response.json(books);
// }

// export async function POST(request: Request) {
//   const body = await request.json();

//   const newBook = {
//     id: Date.now(),
//     ...body,
//   };
//   books.push(newBook);
//   return Response.json({ book: newBook }, { status: 201 });
// }

// export async function DELETE(request: Request) {
//   const body = await request.json();
//   const { id } = body;

//   // books = books.filter((b)=> b.id!=id)
//   const index = books.findIndex((b) => b.id == id);
//   if (index != -1) {
//     books.splice(index, 1);
//   }

//   return Response.json({ id })
// }

// export async function PUT(request: Request) {
//   const body = await request.json();
//   const { id, bookName, author, categories, publishedOn } = body;
//   const index = books.findIndex((b) => b.id == id);
//   if (index != -1) {
//     books[index] = {
//       id,
//       bookName,
//       author,
//       publishedOn,
//       categories
//     }
//   }
//   return Response.json({ book: books[index] })

// }