import React, { useRef, useState, useEffect, useCallback } from "react";

const App = () => {
  const inputRef = useRef(null); // For the text box focus
  const timerRef = useRef(null); // For the timer ID
  const [time, setTime] = useState(10); // Timer state
  const [isRunning, setIsRunning] = useState(false); // To track if the timer is running

  // Automatically focus the text box when the component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Start the timer (memoized with useCallback)
  const startTimer = useCallback(() => {
    if (isRunning) return; // Prevent multiple timers
    setIsRunning(true);

    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, [isRunning]);

  // Stop the timer (memoized with useCallback)
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  }, []);

  // Reset the timer (memoized with useCallback)
  const resetTimer = useCallback(() => {
    stopTimer(); // Ensure no timer is running
    setTime(10); // Reset to initial value
  }, [stopTimer]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Input Box */}
      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type something..."
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button
          onClick={() => inputRef.current.focus()}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Focus Box
        </button>
      </div>

      {/* Timer Display */}
      <div style={{ marginTop: "20px", fontSize: "24px", fontWeight: "bold" }}>
        {time > 0 ? (
          <span>{time} seconds remaining</span>
        ) : (
          <span style={{ color: "red" }}>Time's Up!</span>
        )}
      </div>

      {/* Timer Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={startTimer}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Start Timer
        </button>
        <button
          onClick={stopTimer}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Stop Timer
        </button>
        <button
          onClick={resetTimer}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Reset Timer
        </button>
      </div>
    </div>
  );
};

export default App;
