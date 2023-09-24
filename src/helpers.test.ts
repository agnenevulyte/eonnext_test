import { validateInput } from "./helpers";

describe("validateInput", () => {
  it("should return an empty string for valid input", () => {
    expect(validateInput("12345")).toBe("");
    expect(validateInput("0")).toBe("");
    expect(validateInput("99999")).toBe("");
  });

  it("should return an error message for input with a decimal", () => {
    expect(validateInput("123.45")).toBe(
      "Please don't include the decimal in your reading"
    );
    expect(validateInput("0.5")).toBe(
      "Please don't include the decimal in your reading"
    );
  });

  it("should return an error message for input below 0", () => {
    expect(validateInput("-1")).toBe(
      "Value must be a 5-digit number between 00000 and 99999"
    );
    expect(validateInput("-12345")).toBe(
      "Value must be a 5-digit number between 00000 and 99999"
    );
  });

  it("should return an error message for input above 99999", () => {
    expect(validateInput("100000")).toBe(
      "Value must be a 5-digit number between 00000 and 99999"
    );
    expect(validateInput("123456")).toBe(
      "Value must be a 5-digit number between 00000 and 99999"
    );
  });
});
