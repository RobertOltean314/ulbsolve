import React from "react";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroAnimatedCubes from "./HeroAnimatedCubes";
import HeroLines from "./HeroLines";
import HeroNoiseOverlay from "./HeroNoiseOverlay";
import HeroGlobalStyles from "./HeroGlobalStyles";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  onCtaClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
}) => {
  // Define internal defaults
  const primaryColor = "#FF0000";
  const secondaryColor = "#0000FF";
  const backgroundImage = "/default-background.jpg";
  const textColor = "text-white";
  const textColorMuted = "text-gray-400";
  const isMobile = false; // You can use your own logic here to detect mobile
  const isInView = true; // You can modify based on visibility triggers
  const bgColor = "bg-gray-800"; // Default background color

  return (
    <section
      className={`min-h-screen w-full flex items-center justify-center pt-20 relative overflow-hidden ${bgColor}`}
      aria-label="Hero section"
    >
      <HeroBackground
        backgroundImage={backgroundImage}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        isMobile={isMobile}
      />

      <HeroContent
        title={title}
        subtitle={subtitle}
        description={description}
        ctaText={ctaText}
        onCtaClick={onCtaClick}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        textColor={textColor}
        textColorMuted={textColorMuted}
        isInView={isInView}
      />

      {!isMobile && (
        <>
          <HeroAnimatedCubes
            isInView={isInView}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
          <HeroLines isInView={isInView} primaryColor={primaryColor} />
          <HeroNoiseOverlay />
        </>
      )}
      <HeroGlobalStyles />
    </section>
  );
};

export default HeroSection;
