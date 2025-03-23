'use client';

import { useEffect, useState } from 'react';

export default function TimeDisplay() {
  const [time, setTime] = useState<string>(() => new Date().toLocaleString('es-ES'));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString('es-ES'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <time dateTime={new Date().toISOString()}>{time}</time>
  );
}
