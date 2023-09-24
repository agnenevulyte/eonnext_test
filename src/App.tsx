import { useEffect, useState } from "react";
import { MeterReading } from "./types";
import { calculatePredictedUsage, validateInput } from "./helpers";
import "./styles.css";

export default function App() {
  const [readings, setReadings] = useState<MeterReading[]>([]);
  const [currentValue, setCurrentValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [predictedUsage, setPredictedUsage] = useState<MeterReading | null>(
    null
  );

  useEffect(() => {
    const predicted = calculatePredictedUsage(readings);
    setPredictedUsage(predicted);
  }, [readings]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    setCurrentValue(value);
    const errorMessage = validateInput(value);
    setError(errorMessage);
  };

  const handleSubmit = () => {
    const errorMessage = validateInput(currentValue);

    if (!currentValue) {
      setError("This field is required");
      return;
    }

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    const newValue = parseFloat(currentValue);

    if (readings.length > 0 && newValue <= readings[0].value) {
      setError(
        `A new reading must be higher than the last reading. Last reading was: ${readings[0].value}.`
      );
      return;
    }

    const newReading: MeterReading = {
      value: newValue,
      source: "customer",
    };

    setReadings([newReading, ...readings]);
    setCurrentValue("");
    setError("");
  };

  const readingListItems = readings.map((reading) => (
    <li key={reading.value}>
      {reading.value} - {reading.source}
    </li>
  ));

  return (
    <div className="App">
      <h1>Meter Readings</h1>
      <div className="input-container">
        <label htmlFor="meter-reading">Enter a new meter reading:</label>
        <input
          aria-invalid={!!error}
          id="meter-reading"
          className={`input ${error ? "error" : ""}`}
          type="number"
          min="0"
          max="99999"
          pattern="[0-9]+"
          inputMode="decimal"
          value={currentValue}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        {error && <p className="error">{error}</p>}
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <h2>Predicted usage next month</h2>
      {predictedUsage ? (
        <p>{predictedUsage.value}</p>
      ) : (
        <p>Not enough readings to predict usage</p>
      )}
      <h2>Previous meter readings</h2>

      {readingListItems.length > 0 ? (
        <ul style={{ listStyleType: "none" }}>{readingListItems}</ul>
      ) : (
        <p>No previous readings provided</p>
      )}
    </div>
  );
}
