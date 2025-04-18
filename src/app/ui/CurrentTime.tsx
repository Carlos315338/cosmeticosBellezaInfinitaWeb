import { useState, useEffect, FC } from "react";

interface CurrentTimeProps {
  config?: object; // Acepta cualquier objeto, pero no tipos primitivos.
}

const CurrentTime: FC<CurrentTimeProps> = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

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
    <div className="col-4 text-end text-purple">
      {/* Asegúrate de implementar y exportar TimeDisplay */}
      <TimeDisplay currentTime={currentTime} />
    </div>
  );
};

interface TimeDisplayProps {
  currentTime: string;
}

const TimeDisplay: FC<TimeDisplayProps> = ({ currentTime }) => (
  <p>{currentTime}</p>
);

export default CurrentTime;
