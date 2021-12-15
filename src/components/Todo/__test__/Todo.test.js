import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Todo from "../Todo";

const MockTodo = () => {
  return (
    <BrowserRouter>
      <Todo></Todo>
    </BrowserRouter>
  );
};

const addTasks = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByRole("button", { name: /Add/i });
  tasks.forEach((task) => {
    fireEvent.change(inputElement, { target: { value: task } });
    fireEvent.click(buttonElement);
  });
};

// GET BY ROLE REF -  https://www.w3.org/TR/html-aria/#docconformance

// GET BY -  queries return the first matching node for a query, and throw an error if no elements match or if more than one match is found (use getAllBy instead).

describe("Todo", () => {
  test("I can add 1 todo from input)", () => {
    render(<MockTodo />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    fireEvent.change(inputElement, { target: { value: "Do the washing" } });
    fireEvent.click(buttonElement);
    const divElement = screen.getByText(/Do the washing/i);
    expect(divElement).toBeInTheDocument();
  });

  test("I can add 3 todo from input)", () => {
    render(<MockTodo />);
    addTasks(["Do the washing", "Clean the car", "take the rubbish out"]);
    const divElement = screen.getAllByTestId("todo");
    expect(divElement.length).toBe(3);
  });

  test("Todo should not have completed task when initially rendered", () => {
    render(<MockTodo />);
    addTasks(["Do the washing"]);
    const divElement = screen.getByText(/Do the washing/i);
    expect(divElement).not.toHaveClass("todo-item-active");
  });

  test("Todo should have completed task styles when clicked", () => {
    render(<MockTodo />);
    addTasks(["Do the washing"]);
    const divElement = screen.getByText(/Do the washing/i);
    fireEvent.click(divElement);

    expect(divElement).toHaveClass("todo-item-active");
  });
});
