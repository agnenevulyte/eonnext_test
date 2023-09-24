// This is just to help the exercise.
// You do not need to edit this.
import { MeterReading } from "./types";

export const validateInput = (value: string): string => {
  const newValue = parseFloat(value);

  if (newValue % 1 !== 0) {
    return "Please don't include the decimal in your reading";
  } else if (newValue < 0 || newValue > 99999) {
    return "Value must be a 5-digit number between 00000 and 99999";
  } else {
    return "";
  }
};
