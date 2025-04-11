import { forwardRef, useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { features } from "../../../data/presentationPage.features";
import FeaturesBackground from "./FeaturesBackground";
import FeaturesHeading from "./FeaturesHeading";
import FeatureGrid from "./FeaturesGrid";
import AnimationStyles from "./AnimationStyles";

export const FeaturesSection = forwardRef<HTMLDivElement>((props, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [isMobile, setIsMobile] = useState(false);

  // ULBS color palette
  const primaryBlue = "#0A3363"; // Navy blue from logo
  const primaryRed = "#CC0000"; // Red from logo

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
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: primaryBlue }}
      ref={(node: HTMLDivElement | null) => {
        // Handle both refs
        sectionRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
    >
      <FeaturesBackground
        isMobile={isMobile}
        primaryBlue={primaryBlue}
        primaryRed={primaryRed}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <FeaturesHeading isInView={isInView} title="Key Features" />

        <FeatureGrid
          features={features}
          isInView={isInView}
          primaryBlue={primaryBlue}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#CC0000]"></div>

      <AnimationStyles />
    </section>
  );
});

FeaturesSection.displayName = "FeaturesSection";

export default FeaturesSection;
