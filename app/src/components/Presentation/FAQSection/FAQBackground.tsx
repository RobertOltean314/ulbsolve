import React from "react";
import AnimatedCube from "../../AnimatedCube/AnimatedCube";

interface SectionBackgroundProps {
  primaryBlue: string;
  primaryRed: string;
}

export const SectionBackground: React.FC<SectionBackgroundProps> = ({
  primaryBlue,
  primaryRed,
}) => {
  return (
    <>
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"
          aria-hidden="true"
        />

        {/* Subtle color accents */}
        <div
          className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-5"
          style={{
            background: `radial-gradient(circle, ${primaryBlue} 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-5"
          style={{
            background: `radial-gradient(circle, ${primaryRed} 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Decorative elements */}
        <div className="absolute right-[5%] top-[15%] opacity-20">
          <AnimatedCube size={60} color={primaryRed} rotationSpeed={30} />
        </div>
        <div className="absolute left-[8%] bottom-[20%] opacity-20">
          <AnimatedCube size={60} color={primaryBlue} rotationSpeed={30} />
        </div>
      </div>

      {/* Red accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#CC0000]" />
    </>
  );
};

export default SectionBackground;
