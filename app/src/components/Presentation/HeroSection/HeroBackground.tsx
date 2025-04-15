import React from "react";

interface HeroBackgroundProps {
  backgroundImage?: string;
  primaryColor: string;
  secondaryColor: string;
  isMobile: boolean;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({
  backgroundImage,
  primaryColor,
  secondaryColor,
  isMobile,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}

      <div
        className="absolute top-0 left-0 right-0 h-96"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${primaryColor}0a, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-96"
        style={{
          background: `radial-gradient(circle at 70% 70%, ${primaryColor}0a, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {!isMobile && (
        <div
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"
          aria-hidden="true"
        />
      )}

      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => {
            const size = Math.random() * 2 + 1;
            const starColor = Math.random() > 0.2 ? "white" : secondaryColor;
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
                  opacity: Math.random() * 0.5 + 0.2,
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
    </div>
  );
};

export default HeroBackground;
