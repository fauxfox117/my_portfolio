import { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import "./App.css";

// Parallax Text Component
function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        <span className="block mr-8 text-7xl md:text-8xl font-bold">
          {children}
        </span>
        <span className="block mr-8 text-7xl md:text-8xl font-bold">
          {children}
        </span>
        <span className="block mr-8 text-7xl md:text-8xl font-bold">
          {children}
        </span>
        <span className="block mr-8 text-7xl md:text-8xl font-bold">
          {children}
        </span>
      </motion.div>
    </div>
  );
}

// Project Card Component with Hover Effect
function ProjectCard({ title, description, image, link }) {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-black/10 group ${
        link ? "cursor-pointer" : "cursor-default"
      }`}
      whileHover={{ scale: link ? 1.05 : 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={handleClick}
    >
      <div className="aspect-video overflow-hidden flex items-center justify-center bg-gray-100">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 text-black">{title}</h3>
            <p className="text-black/60">{description}</p>
          </div>
          {link && (
            <div className="ml-4 opacity-60 group-hover:opacity-100 transition-opacity">
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function App() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const portfolioRef = useRef(null);

  // Transform scroll progress to background colors
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      // "rgba(156, 204, 246, 1)",
      "rgba(87, 236, 216, 1)",
      "rgba(202, 155, 250, 1)",
      "rgba(87, 236, 216, 1)",
    ]
  );

  // Circle colors
  const circle1Color = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "rgba(213, 19, 231, 0.4)",
      "rgba(59, 130, 246, 0.4)",
      "rgba(251, 146, 60, 0.4)",
    ]
  );

  const circle2Color = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "rgba(242, 237, 237, 0.4)",
      "rgba(34, 197, 94, 0.4)",
      "rgba(168, 85, 247, 0.4)",
    ]
  );

  const circle3Color = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "rgba(36, 116, 255, 0.4)",
      "rgba(236, 72, 153, 0.4)",
      "rgba(234, 179, 8, 0.4)",
    ]
  );

  // Disable scrolling while loading
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoaded]);

  // Loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
            setTimeout(() => {
              portfolioRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Sample projects - replace with your actual projects
  const projects = [
    {
      title: "WTWR",
      description: "Weather app with React, Context API, and OpenWeatherMap",
      image: "./src/assets/WTWR.svg",
    },
    {
      title: "Amp Calculator",
      description: "React Native app with TypeScript",
      image: "./src/assets/AMP.svg",
    },
    {
      title: "Irick Images",
      description: "Irick Images photography portfolio site",
      image:
        "https://images.squarespace-cdn.com/content/v1/599e2da937c581435a2b791a/1730946165882-GWKCRMNLIL4QI0AVB3P5/IMG_2205.jpeg?format=2500w",
      link: "https://irickimages.com",
    },
    {
      title: "Scoundrel Website",
      description: "Website for Michelin-star restaurant",
      image: "./src/assets/Scoundrel.svg",
      link: "https://scoundrelgvl.com",
    },
  ];

  return (
    <motion.div className="relative min-h-screen" style={{ backgroundColor }}>
      {/* Animated Background Circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            left: "10%",
            top: "10%",
            filter: "blur(60px)",
            background: circle1Color,
          }}
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
        />

        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            right: "10%",
            top: "20%",
            filter: "blur(60px)",
            background: circle2Color,
          }}
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
        />

        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full"
          style={{
            left: "50%",
            bottom: "10%",
            transform: "translateX(-50%)",
            filter: "blur(60px)",
            background: circle3Color,
          }}
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
        />
      </div>

      {/* Loading Screen */}
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative z-10 w-full max-w-xl px-8">
            <motion.h1
              className="text-6xl md:text-7xl mb-16 text-center"
              style={{ fontFamily: "Nabla, cursive" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Steven Bolin
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-black mb-16 text-center"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: "300" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Full-Stack Software Developer
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="relative w-full h-2 bg-white/50 border border-black/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-black"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <div className="flex justify-end mt-4">
                <span className="text-black/60 text-sm font-mono">
                  {progress}%
                </span>
              </div>
            </motion.div>
          </div>

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
        </motion.div>
      )}

      {/* Content sections */}
      {isLoaded && (
        <>
          {/* Portfolio Section */}
          <div ref={portfolioRef} className="relative min-h-screen py-20">
            {/* Portfolio Title */}
            <motion.div
              className="mb-20 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <h2
                className="text-7xl md:text-8xl font-bold text-black"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: "300" }}
              >
                Portfolio
              </h2>
            </motion.div>

            {/* Project Grid */}
            <div className="relative z-10 max-w-7xl mx-auto px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: false }}
                  >
                    <ProjectCard {...project} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <motion.div
              className="mt-32 text-center space-y-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: false }}
            >
              <h2
                className="text-5xl md:text-6xl font-bold text-black mb-5"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: "400" }}
              >
                Tech Stack
              </h2>
              <div
                className="text-3xl md:text-2xl font-light text-black/80 space-y-4"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: "300" }}
              >
                <h2
                  className="text-5xl md:text-2xl font-bold text-black mb-5"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Frontend
                </h2>
                <p>
                  React • Javascript • TypeScript • HTML5 & CSS3 • Framer Motion
                  • Tailwind
                </p>
                <h2
                  className="text-5xl md:text-2xl font-bold text-black mb-8"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Backend
                </h2>
                <p>
                  Node.js • Express.js • RESTful API Development •
                  Authentication & Role-based permissions
                </p>
                <h2
                  className="text-5xl md:text-2xl font-bold text-black mb-8"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Databases
                </h2>
                <p>MongoDB • Mongoose ORM</p>
              </div>
            </motion.div>
          </div>

          {/* About Section */}
          <div className="relative min-h-screen flex items-center justify-center py-20">
            <div className="relative z-10 max-w-6xl mx-auto px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                {/* Image Side */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm border border-black/10">
                    {/* Replace this src with your actual photo */}
                    <img
                      src="src/assets/me.svg"
                      alt="Steven Bolin"
                      className="w-full h-full object-cover"
                    />
                    {/* Placeholder overlay - remove when you add your photo */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                      <p className="text-black/40 text-sm font-mono"></p>
                    </div>
                  </div>
                </motion.div>

                {/* Text Side */}
                <div className="space-y-6">
                  <motion.h2
                    className="text-6xl font-bold text-black"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: false }}
                  >
                    About Me
                  </motion.h2>

                  <motion.div
                    className="space-y-4 text-lg text-black/80"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: false }}
                  >
                    <p>Hey, I'm Steven Bolin!</p>
                    <p>
                      A software engineer and web designer based in South
                      Carolina, specializing in building clean, secure, and
                      intuitive digital experiences.
                    </p>
                    <p>
                      With experience developing full-stack applications,
                      designing modern websites, and delivering polished user
                      interfaces, he focuses on practical solutions that
                      streamline operations and elevate brands. Steven has built
                      websites for businesses such as Scoundrel, Irick Images,
                      and Sweet Sting Sugar Spa, and has developed a growing
                      portfolio of applications including Amp Calculator,
                      Daytrippr, and multiple front-end projects.
                    </p>
                    <p>
                      I am currently completing an intensive software
                      engineering program and continue to expand my skills in
                      modern JavaScript frameworks, UI/UX, and backend systems.
                    </p>
                    <p>
                      Outside of engineering, I am the vocalist of the pop-rock
                      band Practically Paradise and bring the same creativity,
                      discipline, and high-performance mindset from music into
                      my work. I blend design intuition with technical precision
                      to create work that is both functional and beautiful.
                    </p>
                    <p>Based in Greenville, SC.</p>
                  </motion.div>

                  {/* Social Links or CTA */}
                  <motion.div
                    className="flex justify-center gap-4 pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: false }}
                  >
                    <motion.a
                      href="mailto:info@stevenabolin.com"
                      className="px-8 py-3 bg-black text-white rounded-full font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get in Touch
                    </motion.a>
                    <motion.a
                      href="https://github.com/fauxfox17"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 bg-white/80 backdrop-blur-sm border border-black/10 text-black rounded-full font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      GitHub
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
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
        </>
      )}
    </motion.div>
  );
}

export default App;
