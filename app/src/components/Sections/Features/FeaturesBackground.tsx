import React from "react";
import AnimatedCube from "../../AnimatedCube/AnimatedCube";

interface FeaturesBackgroundProps {
  isMobile: boolean;
  primaryBlue: string;
  primaryRed: string;
}

const FeaturesBackground: React.FC<FeaturesBackgroundProps> = ({
  isMobile,
  primaryRed,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      <div className="absolute top-0 left-0 right-0 h-96 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05),transparent_70%)]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.05),transparent_70%)]"></div>

      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => {
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
                  opacity: Math.random() * 0.4 + 0.1,
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

      {!isMobile && (
        <>
          <div className="absolute left-[5%] top-[20%] opacity-20 transform rotate-12">
            <AnimatedCube size={80} color={primaryRed} rotationSpeed={25} />
          </div>
          <div className="absolute right-[5%] bottom-[15%] opacity-20 transform -rotate-12">
            <AnimatedCube size={80} color="#FFFFFF" rotationSpeed={25} />
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturesBackground;
