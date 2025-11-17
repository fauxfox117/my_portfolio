import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background Circles - Now Moving Randomly */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {/* Circle 1 - Moves in a figure-8 pattern */}
        <motion.div
          className="absolute w-96 h-96 rounded-full circle-gradient-1"
          animate={{
            x: [0, 200, 0, -200, 0],
            y: [0, -100, 200, -100, 0],
            scale: [1, 1.2, 1, 1.3, 1],
            opacity: [0.3, 0.5, 0.4, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ left: "20%", top: "20%" }}
        />

        {/* Circle 2 - Drifts diagonally */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full circle-gradient-2"
          animate={{
            x: [0, -150, 100, -50, 0],
            y: [0, 150, -100, 50, 0],
            scale: [1.2, 1, 1.4, 1.1, 1.2],
            opacity: [0.2, 0.4, 0.3, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ right: "15%", bottom: "15%" }}
        />

        {/* Circle 3 - Orbits around center */}
        <motion.div
          className="absolute w-64 h-64 rounded-full circle-gradient-3"
          animate={{
            x: [0, 150, 0, -150, 0],
            y: [0, -150, 0, 150, 0],
            scale: [1, 1.3, 1.2, 1.4, 1],
            opacity: [0.4, 0.2, 0.5, 0.3, 0.4],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-xl px-8">
        {/* Name */}
        <motion.h1
          className="text-6xl md:text-7xl font-bold text-white mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Steven Bolin
        </motion.h1>
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-white mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Full-Stack Software Engineer
        </motion.h2>

        {/* Loading Bar Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-black border border-white/20 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-white"
              animate={
                progress >= 90
                  ? {
                      width: "90%",
                      opacity: [1, 0.3, 1],
                    }
                  : {
                      width: `${progress}%`,
                    }
              }
              transition={
                progress >= 90
                  ? {
                      opacity: {
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
                  : {
                      duration: 0.1,
                    }
              }
            />
          </div>

          {/* Percentage */}
          <div className="flex justify-end mt-4">
            <span className="text-white/60 text-sm font-mono">{progress}%</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Corner Text */}
      <motion.div
        className="absolute bottom-8 left-8 text-sm text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>Greenville SC</p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 text-sm text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>© 2024</p>
      </motion.div>
    </div>
  );
}

export default App;
