import React from "react";

interface HeroContentProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  onCtaClick: () => void;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  textColorMuted: string;
  isInView: boolean;
}

const HeroContent: React.FC<HeroContentProps> = ({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
  primaryColor,
  secondaryColor,
  textColor,
  textColorMuted,
}) => {
  return (
    <div className="w-full max-w-5xl px-6 md:px-8 text-center z-10 relative backdrop-blur-sm bg-black/5 rounded-xl py-12 md:py-16">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl"
        style={{ backgroundColor: primaryColor, opacity: 0.08 }}
        aria-hidden="true"
      />

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight text-white">
        {title}
      </h1>

      <h2
        className={`text-lg sm:text-xl md:text-2xl font-medium mb-8 ${textColor}`}
      >
        {subtitle}
      </h2>

      <p
        className={`text-base sm:text-lg md:text-xl mb-12 max-w-3xl mx-auto ${textColorMuted}`}
      >
        {description}
      </p>

      <button
        onClick={onCtaClick}
        className="text-lg font-bold py-3 md:py-4 px-8 md:px-12 rounded-md text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
        style={{
          backgroundColor: secondaryColor,
          boxShadow: `0 4px 14px ${primaryColor}40`,
        }}
        aria-label={ctaText}
      >
        <span className="relative z-10">{ctaText}</span>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to right, ${secondaryColor}, #E50000)`,
          }}
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

export default HeroContent;
