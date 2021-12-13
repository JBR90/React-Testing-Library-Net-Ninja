import { render, screen, fireEvent } from "@testing-library/react";
import AddInput from "../AddInput";

// GET BY ROLE REF -  https://www.w3.org/TR/html-aria/#docconformance

// GET BY -  queries return the first matching node for a query, and throw an error if no elements match or if more than one match is found (use getAllBy instead).

const mockedSetTodo = jest.fn();

describe("Add Input", () => {
  test("Should render input element", async () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here/i);
    expect(inputElement).toBeInTheDocument();
  });

  test("Should be able to type into the input", async () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here/i);
    fireEvent.change(inputElement, {
      target: { value: "Go grocery shopping" },
    });
    expect(inputElement.value).toBe("Go grocery shopping");
  });

  test("Should have empty input when add btn is clicked", async () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here/i);
    const btnElement = screen.getByRole("button", { name: /Add/i });
    fireEvent.change(inputElement, {
      target: { value: "Go grocery shopping" },
    });

    fireEvent.click(btnElement);
    expect(inputElement.value).toBe("");
  });
});
