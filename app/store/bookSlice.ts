import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export type Book = {
  id: number;
  bookName: string;
  author: string;
  publishedOn: string;
};

type BooksState = {
  booksList: Book[];
};

const initialState: BooksState = {
  booksList: [],
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    return data;
  }
);

export const addBookAsync = createAsyncThunk(
  "books/addBookAsync",
  async (newBook: Omit<Book, "id">) => {
    const res = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    const data = await res.json();
    return data; 
  }
);


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
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.booksList.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.booksList[index] = action.payload;
      }
    },
    deleteBook: (state, action: PayloadAction<number>) => {
      state.booksList = state.booksList.filter((b) => b.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
  builder
    .addCase(fetchBooks.fulfilled, (state, action) => {
      state.booksList = action.payload;
    })
    .addCase(addBookAsync.fulfilled, (state, action) => {
      state.booksList.push(action.payload.book); 
    });
}
});

export const {deleteBook, updateBook } = booksSlice.actions;
export default booksSlice.reducer;
