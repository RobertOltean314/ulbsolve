import { motion } from "framer-motion";

interface CTASectionButtonProps {
  label: string;
  onClick: () => void;
  primary: boolean;
}

export const CTASectionButton: React.FC<CTASectionButtonProps> = ({
  label,
  onClick,
  primary,
}) => {
  // ULBS color palette
  const primaryBlue = "#0A3363"; // Navy blue from logo
  const primaryRed = "#CC0000"; // Red from logo

  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
      className={`py-3 px-8 rounded-xl font-semibold text-base transition-all duration-300 
        ${
          primary
            ? `bg-gradient-to-r from-[${primaryBlue}] to-[${primaryRed}] text-white hover:opacity-90`
            : `bg-white text-[${primaryBlue}] border border-[${primaryBlue}]/20 hover:bg-[${primaryBlue}]/5`
        }`}
    >
      {label}
    </motion.button>
  );
};
