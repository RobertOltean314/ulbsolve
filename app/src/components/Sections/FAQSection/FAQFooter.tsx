import React from "react";
import { motion } from "framer-motion";

interface SectionFooterProps {
  text: string;
  isInView: boolean;
  delay?: number;
}

export const SectionFooter: React.FC<SectionFooterProps> = ({
  text,
  isInView,
  delay = 0.6,
}) => {
  return (
    <motion.div
      className="mt-16 text-center max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <p className="text-gray-600">{text}</p>
    </motion.div>
  );
};

export default SectionFooter;
