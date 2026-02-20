import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type Book = {
  id: number;
  bookName: string;
  author: string;
  publishedOn: string;
  categories: string[];
};

type BooksState = {
  booksList: Book[];
};

const initialState: BooksState = {
  booksList: [],
};


// export const fetchBooks = createAsyncThunk(
//   "books/fetchBooks",
//   async () => {
//     try {
//       const res = await fetch("/api/books");
//       if (!res.ok) {
//         throw new Error("Failed to fetch books");
//       }

//       const data = await res.json();
//       return data;
//     }

//     catch (error) {
//       throw error;
//     }
//   }
// );

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ publishedOn, name, categories, sortBy,
    sortOrder, }: {
      publishedOn?: string; name?: string; categories?: string[]; sortBy?: "bookName" | "publishedOn";
      sortOrder?: "asc" | "desc";
    } = {}) => {
    try {
      let url = "/api/books";
      const params = new URLSearchParams();

      if (publishedOn) params.append("publishedOn", publishedOn);
      if (name) params.append("name", name);
      if (categories && categories.length > 0) {
        categories.forEach(c => params.append("categories", c));
      }
      if (sortBy) params.append("sortBy", sortBy);
      if (sortOrder) params.append("sortOrder", sortOrder);

      if (params.toString()) {
        url = `/api/books?${params.toString()}`;
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await res.json();
      return data;
    }
    catch (error) {
      throw error;
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (newBook: Omit<Book, "id">) => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      if (!res.ok) {
        throw new Error("Failed to add book");
      }

      const data = await res.json();
      return data;
    }

    catch (error) {
      throw error;
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id: number) => {
    try {
      const res = await fetch("/api/books", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        throw new Error("Failed to delete book");
      }

      const data = await res.json();
      return data;
    }

    catch (error) {
      throw error;
    }

  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (updatedBook: Book) => {
    try {
      const res = await fetch("/api/books",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBook)
        }
      )
      if (!res.ok) {
        throw new Error("Failed to update book")
      }
      const data = await res.json();
      return data;
    }
    catch (error) {
      throw error;
    }

  }
)

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // addBook: (state, action: PayloadAction<Omit<Book, "id">>) => {
    //   state.booksList.push({
    //     id: Date.now(),
    //     ...action.payload,
    //   });
    // },
    // updateBook: (state, action: PayloadAction<Book>) => {
    //   const index = state.booksList.findIndex(b => b.id === action.payload.id);
    //   if (index !== -1) {
    //     state.booksList[index] = action.payload;
    //   }
    // },
    // deleteBook: (state, action: PayloadAction<number>) => {
    //   state.booksList = state.booksList.filter((b) => b.id !== action.payload);
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.booksList = action.payload;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.booksList.push(action.payload.book);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.booksList = state.booksList.filter((b) =>
          b.id != action.payload.id
        )
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.booksList.findIndex((b) =>
          b.id == action.payload.book.id
        )
        if (index != -1) {
          state.booksList[index] = action.payload.book;
        }
      })
  }
});

// export const {updateBook } = booksSlice.actions;
export default booksSlice.reducer;
