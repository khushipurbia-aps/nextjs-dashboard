import { fireEvent, render, screen } from "@testing-library/react";
import Addmodal from "./AddModal";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "@/app/store/bookSlice";
import { booksSlice } from "@/app/store/bookSlice";
import { addBook } from "@/app/store/bookSlice";
import reducer from "@/app/store/authSlice";

jest.mock("../../../../app/store/bookSlice", () => ({
    ...jest.requireActual("../../../../app/store/bookSlice"),
    addBook: jest.fn(() => () => ({
        unwrap: () => new Promise(() => { }),
    })),
}));

jest.mock("../../DayPicker", () => ({
    __esModule: true,
    default: ({ setPublishedOn }: any) => (
        <button onClick={() => setPublishedOn(new Date("2024-01-01"))}>
            Pick Date
        </button>
    ),
}));

jest.mock("../../ReactSelect", () => ({
    __esModule: true,
    default: ({ setCategories }: any) => (
        <button onClick={() => setCategories([{ value: "Fiction", label: "Fiction" }])}>
            Select Category
        </button>
    ),
}));

const customStore = configureStore({
    reducer: { books: booksSlice.reducer },
    preloadedState: {
        books: {
            booksList: [
                {
                    id: 1,
                    bookName: "Test Book",
                    author: "Test Author",
                    publishedOn: "2024-01-01",
                    categories: ["Fiction"],
                },
            ],
            totalBooks: 1,
            totalPages: 1,
            loading: false,
            filters: {},
        },
    },
});

describe("AddModal", () => {
    it("add book mode", () => {
        render(
            <Provider store={store}>
                <Addmodal open={true} setOpen={jest.fn()} onSuccess={jest.fn()} />
            </Provider>
        )
        expect(screen.getByText("Add Book")).toBeInTheDocument();
        expect(screen.getByText("Fill in the book details below")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
    })


    it("shows spinner and adding...", async () => {
        render(
            <Provider store={store}>
                <Addmodal open={true} setOpen={jest.fn()} onSuccess={jest.fn()} />
            </Provider>
        );
        fireEvent.change(screen.getByLabelText("Book Name"), {
            target: { value: "Test Book" },
        });
        fireEvent.change(screen.getByLabelText("Author"), {
            target: { value: "Test Author" },
        });
        fireEvent.click(screen.getByText("Select Category"));
        fireEvent.click(screen.getByText("Pick Date"));
        const addbutton = screen.getByRole("button", { name: "Add" });
        fireEvent.click(addbutton);
        expect(await screen.findByText("Adding...")).toBeInTheDocument();
        expect(addbutton).toBeDisabled();
    });


    it("disables submit button when form is invalid", () => {
        render(
            <Provider store={store}>
                <Addmodal open={true} setOpen={jest.fn()} onSuccess={jest.fn()} />
            </Provider>
        );
        const button = screen.getByRole("button", { name: "Add" });
        expect(button).toBeDisabled();
    });


    it("cancel button clicked", () => {
        const mockSetOpen = jest.fn();
        render(
            <Provider store={store}>
                <Addmodal open={true} setOpen={mockSetOpen} onSuccess={jest.fn()} />
            </Provider>
        );
        const cancelButton = screen.getByRole("button", { name: "Cancel" });
        fireEvent.click(cancelButton);
        expect(mockSetOpen).toHaveBeenCalledWith(false);
    });


    it("edit book mode", async () => {
        // await store.dispatch(addBook({
        //     bookName: "Test Book",
        //     author: "Test Author",
        //     publishedOn: "2024-01-01",
        //     categories: ["Fiction"],
        // }));
        render(
            <Provider store={customStore}>
                <Addmodal open={true} setOpen={jest.fn()} bookToEditId={1} onSuccess={jest.fn()} />
            </Provider>
        )
        expect(screen.getByText("Edit Book")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    })


    it("shows spinner and saving... ", async () => {
        render(
            <Provider store={customStore}>
                <Addmodal open={true} setOpen={jest.fn()} bookToEditId={1} onSuccess={jest.fn()} />
            </Provider>
        );
        fireEvent.change(screen.getByLabelText("Book Name"), {
            target: { value: "Updated Book" },
        });
        fireEvent.change(screen.getByLabelText("Author"), {
            target: { value: "Updated Author" },
        });
        fireEvent.click(screen.getByText("Select Category"));
        fireEvent.click(screen.getByText("Pick Date"));
        const saveButton = screen.getByRole("button", { name: "Save" });
        fireEvent.click(saveButton);
        expect(await screen.findByText("Saving...")).toBeInTheDocument();
        expect(saveButton).toBeDisabled();
    });

    it("", ()=>{

    })

})


