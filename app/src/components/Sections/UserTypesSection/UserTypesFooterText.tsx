import React from "react";
import { motion } from "framer-motion";

interface FooterTextProps {
  isInView: boolean;
}

const FooterText: React.FC<FooterTextProps> = ({ isInView }) => {
  return (
    <motion.div
      className="mt-16 text-center max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <p className="text-gray-600">
        ULBSolve brings together diverse talents from across the university
        ecosystem, creating opportunities for collaboration, growth, and
        innovation.
      </p>
    </motion.div>
  );
};

export default FooterText;
