import { render, screen } from "@testing-library/react";
import TodoFooter from "../TodoFooter";
import { BrowserRouter } from "react-router-dom";

// GET BY ROLE REF -  https://www.w3.org/TR/html-aria/#docconformance

// GET BY -  queries return the first matching node for a query, and throw an error if no elements match or if more than one match is found (use getAllBy instead).

const MockTodoFooter = ({ numberOfIncompleteTasks }) => {
  return (
    <BrowserRouter>
      <TodoFooter
        numberOfIncompleteTasks={numberOfIncompleteTasks}
      ></TodoFooter>
    </BrowserRouter>
  );
};

describe("TodoFooter", () => {
  test("GET BY -Should render the correct amount of incorrect tasks", async () => {
    render(<MockTodoFooter numberOfIncompleteTasks={5} />);
    const paragraphElement = screen.getByText(/5 tasks left/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  test("GET BY -Should render 'task' when number of incomplete tasks is 1'", async () => {
    render(<MockTodoFooter numberOfIncompleteTasks={1} />);
    const paragraphElement = screen.getByText(/1 task left/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  test("GET BY - Is the render visible - Useful with opacity = 0", async () => {
    render(<MockTodoFooter numberOfIncompleteTasks={1} />);
    const paragraphElement = screen.getByText(/1 task left/i);
    expect(paragraphElement).toBeVisible();
  });

  test("GET BY - Should render 'p' tag", async () => {
    render(<MockTodoFooter numberOfIncompleteTasks={1} />);
    const paragraphElement = screen.getByText(/1 task left/i);
    expect(paragraphElement).toContainHTML("p");
  });

  test("GET BY - Should render '2 task left (textContent)", async () => {
    render(<MockTodoFooter numberOfIncompleteTasks={1} />);
    const paragraphElement = screen.getByText(/1 task left/i);
    expect(paragraphElement).toHaveTextContent("1 task left");
  });

  test("GET BY - Should render '2 task left (not falsy)", async () => {
    render(<MockTodoFooter numberOfIncompleteTasks={1} />);
    const paragraphElement = screen.getByText(/1 task left/i);
    expect(paragraphElement).not.toBeFalsy();
  });

  test("GET BY - Should render '2 task left (not falsy)", async () => {
    render(<MockTodoFooter numberOfIncompleteTasks={1} />);
    const paragraphElement = screen.getByText(/1 task left/i);
    expect(paragraphElement.textContent).toBe("1 task left");
  });
});
