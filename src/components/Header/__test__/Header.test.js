import { render, screen } from "@testing-library/react";
import Header from "../Header";

// GET BY ROLE REF -  https://www.w3.org/TR/html-aria/#docconformance

// GET BY -  queries return the first matching node for a query, and throw an error if no elements match or if more than one match is found (use getAllBy instead).

describe("Header", () => {
  test("GET BY - renders same text that is passed into props (by text)", () => {
    render(<Header title="Todo" />);
    const headingElement = screen.getByText(/Todo/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("GET BY - renders same text that is passed into props (by role)", () => {
    render(<Header title="Todo" />);
    const headingElement = screen.getByRole("heading", { name: "Todo" });
    expect(headingElement).toBeInTheDocument();
  });

  test("GET BY - renders same text that is passed into props (by title)", () => {
    render(<Header title="Todo" />);
    const headingElement = screen.getByTitle("heading");
    expect(headingElement).toBeInTheDocument();
  });

  test("GET BY - renders same text that is passed into props (by id)", () => {
    render(<Header title="Todo" />);
    const headingElement = screen.getByTestId("header-1");
    expect(headingElement).toBeInTheDocument();
  });

  // FIND BY  (ASYNC) - queries return a promise which resolves when a matching element is found. The promise is rejected if no elements match or if more than one match is found after a default timeout of 4500ms. If you need to find more than one element, then use findAllBy.

  test("FIND BY - renders same text that is passed into props (by text)", async () => {
    render(<Header title="Todo" />);
    const headingElement = await screen.findByText(/Todo/i);
    expect(headingElement).toBeInTheDocument();
  });

  // QUERY BY - queryBy* queries return the first matching node for a query, and return null if no elements match.

  test("QUERY BY - renders same text that is passed into props (by text)", async () => {
    render(<Header title="Todo" />);
    const headingElement = screen.queryByText(/Hodo/i);
    expect(headingElement).not.toBeInTheDocument();
  });

  test("GET ALL - renders same text that is passed into props (by roll)", async () => {
    render(<Header title="Todo" />);
    const headingElement = screen.getAllByRole("heading");
    expect(headingElement.length).toBe(2);
  });
});
