import { useEffect, useState } from "react";

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
    <div className="col-4 text-end">
      <time dateTime={new Date().toISOString()} style={{ color: "black" }}>
        {currentTime}
      </time>
    </div>
  );
};

export default CurrentTime;
