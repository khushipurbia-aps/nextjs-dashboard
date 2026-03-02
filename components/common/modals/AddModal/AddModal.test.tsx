import { render, screen } from "@testing-library/react";
import Addmodal from "./AddModal";

describe("AddModal", () => {
    it("", () => {
        render(<Addmodal open={true} setOpen={jest.fn()} onSuccess={jest.fn()} />)
        expect(screen.getByText("Add Book")).toBeInTheDocument();
        expect(screen.getByText("Fill in the book details below")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
    })
})
