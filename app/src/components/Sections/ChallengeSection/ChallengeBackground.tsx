import React from "react";

interface ChallengeBackgroundProps {
  isMobile: boolean;
  primaryBlue: string;
  primaryRed: string;
}

const ChallengeBackground: React.FC<ChallengeBackgroundProps> = ({
  isMobile,
  primaryBlue,
  primaryRed,
}) => {
  return (
    <>
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"
        aria-hidden="true"
      />

      {/* Subtle blue accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A3363] via-[#0A3363] to-transparent" />

      {/* Subtle red accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#CC0000] to-[#CC0000]" />

      {/* Background decorative elements */}
      {!isMobile && (
        <>
          <div
            className="absolute -top-10 -left-10 w-24 h-24 opacity-10"
            style={{
              background: `radial-gradient(circle, ${primaryBlue}80 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute -bottom-10 -right-10 w-24 h-24 opacity-10"
            style={{
              background: `radial-gradient(circle, ${primaryRed}80 0%, transparent 70%)`,
            }}
          />
        </>
      )}
    </>
  );
};

export default ChallengeBackground;
