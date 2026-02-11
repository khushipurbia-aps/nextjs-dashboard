"use client";
import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false)


  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;
  return (
    <div className="px-4 py-2 border-4 border-black text-xl text-black ">
      {time.toLocaleTimeString()}
    </div>
  );
}
