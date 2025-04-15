import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import ChallengeBackground from "./ChallengeBackground";
import ChallengeHeading from "./ChallengeHeading";
import ChallengeList from "./ChallengeList";
import ChallengeRightColumn from "./ChallengeRightColumn";
import { challenges } from "../../../data/challengeSection.challenges";

const ChallengeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [isMobile, setIsMobile] = useState(false);

  // Primary colors from ULBS logo
  const primaryBlue = "#0A3363";
  const primaryRed = "#CC0000";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      <ChallengeBackground
        isMobile={isMobile}
        primaryBlue={primaryBlue}
        primaryRed={primaryRed}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
        <ChallengeHeading isInView={isInView} primaryBlue={primaryBlue} />

        <div className="flex items-center justify-between gap-12 md:flex-col lg:gap-16">
          <ChallengeList
            challenges={challenges}
            isInView={isInView}
            primaryBlue={primaryBlue}
          />
          <ChallengeRightColumn isInView={isInView} primaryBlue={primaryBlue} />
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;
