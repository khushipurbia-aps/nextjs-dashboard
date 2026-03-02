import { render, screen } from "@testing-library/react";
import InputWrapper from "./InputWrapper";

describe("InputWrapper Component", () => {
  it("renders input with placeholder", () => {
    render(<InputWrapper placeholder="Enter name" />);
    
    const input = screen.getByPlaceholderText("Enter name");
    expect(input).toBeInTheDocument();
  });

  it("renders with value", () => {
    render(<InputWrapper value="Khushi" />);
    
    const input = screen.getByDisplayValue("Khushi");
    expect(input).toBeInTheDocument();
  });

  it("applies error class when error is true", () => {
    render(<InputWrapper error />);
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-red-600");
  });

});