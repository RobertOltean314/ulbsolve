// src/components/WalletConnectButton.tsx
import { FC } from "react";
import { motion } from "framer-motion";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface WalletConnectButtonProps {
  className?: string;
}

const WalletConnectButton: FC<WalletConnectButtonProps> = ({
  className = "",
}) => {
  // ULBS color palette
  const primaryBlue = "#0A3363";
  const primaryRed = "#CC0000";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-block ${className}`}
    >
      <WalletMultiButton
        style={{
          background: `linear-gradient(to right, ${primaryBlue}, ${primaryRed})`,
          color: "white",
          fontWeight: 600,
          borderRadius: "0.75rem",
          padding: "0.75rem 2rem",
          border: "none",
          minWidth: "180px",
          height: "auto",
          fontSize: "1rem",
          lineHeight: "normal",
        }}
      />
    </motion.div>
  );
};

export default WalletConnectButton;
