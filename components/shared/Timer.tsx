import React from "react";
import { useTimer } from "react-timer-hook";

function Timer({ expiryTimestamp }: { expiryTimestamp: any }) {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
    autoStart: true,
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "20px" }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      {/* <p>{isRunning ? "Running" : "Not running"}</p> */}
      {/* <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 10);
          restart(time);
        }}
      >
        Restart
      </button> */}
    </div>
  );
}

export default Timer;
