import { useEffect, useState } from "react";
import TimeDisplay from "./TimeDisplay";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      };
      setCurrentTime(now.toLocaleString("es-ES", options));
    };

    const interval = setInterval(updateTime, 1000);
    updateTime();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-end">
      <TimeDisplay />
    </div>
  );
};

export default CurrentTime;
