import {
  calculatePredictedUsage,
  formatNumberWithLeadingZeros,
  validateInput,
} from "./helpers";
import { MeterReading } from "./types";

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

describe("calculatePredictedUsage", () => {
  const latestReading: MeterReading = { value: 50, source: "customer" };
  const reading1: MeterReading = { value: 40, source: "customer" };
  const reading2: MeterReading = { value: 30, source: "customer" };
  const reading3: MeterReading = { value: 20, source: "customer" };
  const reading4: MeterReading = { value: 10, source: "customer" };

  it("should return null if there are less than 4 readings", () => {
    const readings = [latestReading, reading1, reading2];
    const result = calculatePredictedUsage(readings);
    expect(result).toBeNull();
  });

  it("should calculate predicted usage correctly when there are 4 readings", () => {
    const readings = [latestReading, reading1, reading2, reading3];
    const result = calculatePredictedUsage(readings);

    const expectedValue =
      latestReading.value +
      (latestReading.value -
        reading1.value +
        reading1.value -
        reading2.value +
        reading2.value -
        reading3.value) /
        3;

    expect(result).toEqual({
      value: expectedValue,
      source: "estimated",
    });
  });
});

describe("formatNumberWithLeadingZeros", () => {
  it.each`
    number    | length | expected
    ${5}      | ${3}   | ${"005"}
    ${42}     | ${4}   | ${"0042"}
    ${12345}  | ${6}   | ${"012345"}
    ${123}    | ${3}   | ${"123"}
    ${987654} | ${6}   | ${"987654"}
  `(
    'should format $number with leading zeros to get "$expected"',
    ({ number, length, expected }) => {
      const actual = formatNumberWithLeadingZeros(number, length);
      expect(actual).toEqual(expected);
    }
  );
});
