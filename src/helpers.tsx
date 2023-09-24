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

export const calculatePredictedUsage = (
  readings: MeterReading[]
): MeterReading | null => {
  if (readings.length >= 4) {
    const [latest, reading1, reading2, reading3] = readings.slice(0, 4);
    const averageChange =
      (latest.value -
        reading1.value +
        (reading1.value - reading2.value) +
        (reading2.value - reading3.value)) /
      3;

    const predicted: MeterReading = {
      value: Math.round(latest.value + averageChange),
      source: "estimated",
    };

    return predicted;
  } else {
    return null;
  }
};

export const formatNumberWithLeadingZeros = (
  number: number,
  length: number
): string => {
  return number.toString().padStart(length, "0");
};
