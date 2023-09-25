import { render, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("includes the header", () => {
    const { getByText } = render(<App />);
    getByText("Meter Readings");
  });

  test("renders the input field", () => {
    const { getByLabelText } = render(<App />);
    getByLabelText("Enter a new meter reading:");
  });

  test("renders the submit button", () => {
    const { getByText } = render(<App />);
    getByText("Submit");
  });

  test("displays an error message when submitting an empty reading", () => {
    const { getByText, getByLabelText } = render(<App />);
    const submitButton = getByText("Submit");

    fireEvent.click(submitButton);

    getByText("This field is required");
    getByLabelText("Enter a new meter reading:");
  });

  test("displays an error message when submitting a reading lower than the last reading", () => {
    const { getByText, getByLabelText } = render(<App />);
    const inputField = getByLabelText("Enter a new meter reading:");
    const submitButton = getByText("Submit");

    fireEvent.change(inputField, { target: { value: "50" } });
    fireEvent.click(submitButton);
    fireEvent.change(inputField, { target: { value: "30" } });
    fireEvent.click(submitButton);

    getByText(
      "A new reading must be higher than the last reading. Last reading was: 50."
    );
  });

  test("adds a new reading and clears the input field on successful submission", () => {
    const { getByLabelText, getByText } = render(<App />);
    const inputField = getByLabelText("Enter a new meter reading:");
    const submitButton = getByText("Submit");

    fireEvent.change(inputField, { target: { value: "150" } });
    fireEvent.click(submitButton);

    expect(inputField.getAttribute("value")).toBe("");
    getByText("00150");
  });
});
