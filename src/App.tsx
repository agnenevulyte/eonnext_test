import { useState } from "react";
import { MeterReading } from "./types";
import "./styles.css";

export default function App() {
  const [readings, setReadings] = useState<MeterReading[]>([]);
  const [currentValue, setCurrentValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    setCurrentValue(value);
  };

  const handleSubmit = () => {
    const newValue = parseFloat(currentValue);

    const newReading: MeterReading = {
      value: newValue,
      source: "customer",
    };

    setReadings([newReading, ...readings]);
    setCurrentValue("");
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
          id="meter-reading"
          className="input"
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
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <p className="error" style={{ display: "none" }}>
        This is an invalid meter reading.
      </p>
      <h2>Predicted usage next month</h2>
      <p>Coming soon</p>
      <h2>Previous meter readings</h2>

      {readingListItems.length > 0 ? (
        <ul style={{ listStyleType: "none" }}>{readingListItems}</ul>
      ) : (
        <p>No previous readings provided</p>
      )}
    </div>
  );
}
