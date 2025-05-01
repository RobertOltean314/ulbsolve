import React from "react";
import { motion } from "framer-motion";
import { CTASectionButton } from "./CTASectionButton";

interface CTAContentProps {
  isInView: boolean;
  primaryBlue: string;
  connected: boolean;
  onMarketplaceClick: () => void;
  onWalletConnect: () => void;
  onLearnMoreClick: () => void;
}

export const CTAContent: React.FC<CTAContentProps> = ({
  isInView,
  primaryBlue,
  connected,
  onMarketplaceClick,
  onWalletConnect,
  onLearnMoreClick,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-6"
        style={{ color: primaryBlue }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
        transition={{ duration: 0.6 }}
      >
        Ready to collaborate on real projects?
      </motion.h2>

      <motion.p
        className="text-lg mb-10 text-gray-600 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Join ULBS's digital marketplace to find opportunities, showcase your
        skills, and build your portfolio with meaningful work.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.9,
        }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {connected ? (
          <CTASectionButton
            label="Enter Marketplace"
            onClick={onMarketplaceClick}
            primary={true}
          />
        ) : (
          <CTASectionButton
            label="Connect Wallet"
            onClick={onWalletConnect}
            primary={true}
          />
        )}

        <CTASectionButton
          label="Learn More"
          onClick={onLearnMoreClick}
          primary={false}
        />
      </motion.div>
    </div>
  );
};

export default CTAContent;
