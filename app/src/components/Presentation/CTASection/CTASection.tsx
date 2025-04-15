// Modified CTASection.tsx
import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSolana } from "../../../context/SolanaContext";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import CTABackgroundElements from "./CTABackgroundElements";
import CTAContent from "./CTAContent";

export const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const { connected } = useSolana();
  const { setVisible } = useWalletModal();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // ULBS color palette
  const primaryBlue = "#0A3363"; // Navy blue from logo
  const primaryRed = "#CC0000"; // Red from logo

  const handleWalletConnect = () => {
    setVisible(true);
  };

  const handleMarketplaceClick = () => {
    navigate("/marketplace");
  };

  const handleLearnMoreClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      className="py-24 md:py-32 bg-white relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background elements */}
      <CTABackgroundElements
        primaryBlue={primaryBlue}
        primaryRed={primaryRed}
      />

      {/* Main content */}
      <CTAContent
        isInView={isInView}
        primaryBlue={primaryBlue}
        connected={connected}
        onMarketplaceClick={handleMarketplaceClick}
        onWalletConnect={handleWalletConnect}
        onLearnMoreClick={handleLearnMoreClick}
      />
    </section>
  );
};

export default CTASection;
