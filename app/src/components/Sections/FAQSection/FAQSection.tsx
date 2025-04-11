import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { faqs } from "../../../data/presentationPage.faqs";
import SectionBackground from "./FAQBackground";
import SectionHeader from "./FAQHeader";
import FAQGrid from "./FAQGrid";
import SectionFooter from "./FAQFooter";

export const FAQSection: React.FC = () => {
  // Hooks
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // ULBS color palette
  const primaryBlue = "#0A3363"; // Navy blue from logo
  const primaryRed = "#CC0000"; // Red from logo

  // Animation variants
  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="py-24 md:py-32 bg-white relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background elements */}
      <SectionBackground primaryBlue={primaryBlue} primaryRed={primaryRed} />

      {/* Content container */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section header */}
        <SectionHeader
          title="Frequently Asked Questions"
          color={primaryBlue}
          isInView={isInView}
        />

        {/* FAQ grid */}
        <FAQGrid
          faqs={faqs}
          isInView={isInView}
          primaryBlue={primaryBlue}
          containerVariants={cardContainerVariants}
          cardVariants={cardVariants}
        />

        {/* Section footer */}
        <SectionFooter
          text="We strive to provide clarity and support throughout your project journey."
          isInView={isInView}
        />
      </div>
    </section>
  );
};

export default FAQSection;
