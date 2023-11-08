import { useEffect, useState } from "react";

const useCountdown = (initialTime: number) => {
  const [countDown, setCountDown] = useState(initialTime);
  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting &&
        setCountDown((prevCountDown) => {
          if (prevCountDown <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prevCountDown - 1000;
        });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime, isCounting]);
  const minutes = Math.floor(countDown / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  return { minutes, seconds, isCounting, setIsCounting };
};

export { useCountdown };
