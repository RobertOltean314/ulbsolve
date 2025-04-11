import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { techStack } from "../../../data/presentationPage.techStack";
import AnimatedCube from "../../AnimatedCube/AnimatedCube";

export const TechStackSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [isMobile, setIsMobile] = useState(false);

  // ULBS color palette
  const primaryBlue = "#0A3363"; // Navy blue from logo
  const primaryRed = "#CC0000"; // Red from logo

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: primaryBlue }}
      ref={sectionRef}
    >
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05),transparent_70%)]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.05),transparent_70%)]"></div>

        {/* Subtle star field effect */}
        {!isMobile && (
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => {
              const size = Math.random() * 2 + 1;
              const starColor = Math.random() > 0.2 ? "white" : primaryRed;
              return (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    backgroundColor: starColor,
                    opacity: Math.random() * 0.3 + 0.1,
                    animation: `twinkle ${
                      Math.random() * 5 + 3
                    }s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Decorative elements */}
        {!isMobile && (
          <>
            <div className="absolute left-[5%] top-[30%] opacity-20">
              <AnimatedCube size={80} color={primaryRed} rotationSpeed={25} />
            </div>
            <div className="absolute right-[5%] bottom-[20%] opacity-20">
              <AnimatedCube size={80} color="#FFFFFF" rotationSpeed={30} />
            </div>
          </>
        )}
      </div>

      {/* Red accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#CC0000]"></div>

      {/* Content container */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
          transition={{ duration: 0.6 }}
        >
          Tech Stack
        </motion.h2>

        <motion.div
          className="flex justify-center flex-wrap gap-12 mt-12 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 },
              }}
            >
              {/* Tech icon container with hover effect */}
              <motion.div
                className="w-[90px] h-[90px] rounded-full flex items-center justify-center mb-4 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
                whileHover={{
                  rotate: 360,
                  transition: { duration: 0.6, type: "spring" },
                }}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-[50px] h-[50px] object-contain"
                />
              </motion.div>

              <span className="text-base font-medium text-white/90 text-center">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add animations keyframes */}
      <style>
        {`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
        `}
      </style>
    </section>
  );
};

export default TechStackSection;
