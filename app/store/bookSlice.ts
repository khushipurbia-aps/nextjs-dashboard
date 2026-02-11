import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Omit<Book, "id">>) => {
      state.booksList.push({
        id: Date.now(),
        ...action.payload,
      });
    },
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
});

export const { addBook, deleteBook, updateBook } = booksSlice.actions;
export default booksSlice.reducer;
