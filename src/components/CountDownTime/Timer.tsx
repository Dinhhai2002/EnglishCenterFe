import React from "react";
import { useCountdown } from "./CountDownTime";

const Timer = ({onSubmit}:any) => {
  const initialTime = 120 * 60 * 1000; // 120 minutes in milliseconds
  const { minutes, seconds } = useCountdown(initialTime);
  onSubmit(minutes,seconds);
  return (
    <div >
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;
