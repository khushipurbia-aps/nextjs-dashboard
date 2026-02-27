import {render, screen} from "@testing-library/react"
import InputWrapper from "../InputWrapper"

test("Input with placeholder", ()=>{
    render(<InputWrapper placeholder="Search by Name"/>)
    const input = screen.getByRole("textbox")
    const placeholder = screen.getByPlaceholderText("Search by Name")
    screen.debug()
    expect(input).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
});

test("renders input with placeholder", () => {
  render(<InputWrapper placeholder="Enter name" />);
  
  const input = screen.getByPlaceholderText("Enter name");
  expect(input).toBeInTheDocument();
});