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
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background Circles with Color Changes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Circle 1 - Red/Pink - Moves and changes color */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full circle-gradient-1"
          animate={{
            x: [0, 300, -100, 200, 0],
            y: [0, -200, 150, -100, 0],
            scale: [1, 1.3, 0.9, 1.2, 1],
            opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ left: "10%", top: "10%" }}
        />

        {/* Circle 2 - Teal/Cyan - Moves and changes color */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full circle-gradient-2"
          animate={{
            x: [0, -200, 150, -100, 0],
            y: [0, 200, -150, 100, 0],
            scale: [1.1, 0.9, 1.3, 1, 1.1],
            opacity: [0.5, 0.7, 0.6, 0.8, 0.5],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ right: "10%", top: "20%" }}
        />

        {/* Circle 3 - Orange/Yellow - Moves and changes color */}
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full circle-gradient-3"
          animate={{
            x: [0, 200, -150, 100, 0],
            y: [0, -150, 200, -50, 0],
            scale: [1, 1.4, 0.8, 1.2, 1],
            opacity: [0.7, 0.5, 0.8, 0.6, 0.7],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ left: "50%", bottom: "10%", transform: "translateX(-50%)" }}
        />

        {/* Additional smaller circles for more depth */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(138, 73, 255, 0.3) 0%, transparent 70%)",
            filter: "blur(50px)",
            right: "30%",
            bottom: "30%",
          }}
          animate={{
            x: [0, -150, 100, -50, 0],
            y: [0, 100, -100, 50, 0],
            scale: [0.8, 1.2, 0.9, 1.1, 0.8],
            opacity: [0.4, 0.6, 0.5, 0.7, 0.4],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-xl px-8">
        {/* Name */}
        <motion.h1
          className="text-6xl md:text-7xl mb-16 text-center"
          style={{ fontFamily: "Nabla, cursive" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Steven Bolin
        </motion.h1>

        <motion.h3
          className="text-2xl md:text-1xl text-black mb-16 text-center"
          style={{ fontFamily: "Lato, sans-serif", fontWeight: "300" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Full-Stack Software Engineer
        </motion.h3>

        {/* Loading Bar Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-white/50 border border-black/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="absolute left-0 top-0 h-full bg-black"
              animate={
                progress >= 90
                  ? {
                      width: "90%",
                      opacity: [1, 0.4, 1],
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
            <span className="text-black/60 text-sm font-mono">{progress}%</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Corner Text */}
      <motion.div
        className="absolute bottom-8 left-8 text-sm text-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>Greenville SC</p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 text-sm text-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>© 2025</p>
      </motion.div>
    </div>
  );
}

export default App;
