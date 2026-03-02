import { fireEvent, render, screen } from "@testing-library/react";
import ButtonWrapper from "./ButtonWrapper";

describe("ButtonWrapper", () => {
  it("renders children", () => {
    render(<ButtonWrapper>Click Me</ButtonWrapper>);
    const button = screen.getByRole("button", {name: "Click Me"});
    expect(button).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const mockClick = jest.fn();
    render(<ButtonWrapper onClick={mockClick}>Click Me</ButtonWrapper>);
    const button = screen.getByRole("button")
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("disabled button", () => {
    const mockClick = jest.fn();
    render(
      <ButtonWrapper disabled onClick={mockClick}>Click</ButtonWrapper>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockClick).not.toHaveBeenCalled();
  });
});