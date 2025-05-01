import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  color: string;
  isInView: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  color,
  isInView,
}) => {
  return (
    <motion.h2
      className="text-3xl md:text-4xl font-bold mb-16 text-center"
      style={{ color }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
      transition={{ duration: 0.6 }}
    >
      {title}
    </motion.h2>
  );
};

export default SectionHeader;
