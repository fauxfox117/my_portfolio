import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "./App.css";

const TOTAL_SEGMENTS = 20;
const TARGET_PROGRESS = 90;

function App() {
  const [progress, setProgress] = useState(0);

  // Count up to 90%
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= TARGET_PROGRESS) {
          clearInterval(interval);
          return TARGET_PROGRESS;
        }
        return prev + 5; // Increment by 5 every 100ms
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const filledCount = Math.floor((progress / 100) * TOTAL_SEGMENTS);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-10">
      {/* Header with Loading text and percentage */}
      <div className="w-full max-w-md flex justify-between mb-10">
        <span className="font-mono text-green-500 text-base tracking-wider">
          Loading...
        </span>
        <span className="font-mono text-green-500 text-base tracking-wider">
          {progress}%
        </span>
      </div>

      {/* Progress bar segments */}
      <div className="flex gap-1">
        {Array.from({ length: TOTAL_SEGMENTS }).map((_, index) => {
          const isFilled = index < filledCount;
          const isLastFilled =
            index === filledCount - 1 && progress >= TARGET_PROGRESS;

          if (isLastFilled) {
            // Blinking last segment
            return (
              <motion.div
                key={index}
                className="w-1.5 h-9 rounded-sm bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          }

          return (
            <div
              key={index}
              className={`w-1.5 h-9 rounded-sm ${
                isFilled
                  ? "bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)]"
                  : "bg-[#1a3a1a] border border-[#2d5a2d]"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
