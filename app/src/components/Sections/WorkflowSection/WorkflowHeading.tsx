import React from "react";
import { motion } from "framer-motion";

interface WorkflowHeadingProps {
  isInView: boolean;
}

const WorkflowHeading: React.FC<WorkflowHeadingProps> = ({ isInView }) => {
  return (
    <motion.h2
      className="text-3xl md:text-4xl font-bold mb-16 text-center text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
      transition={{ duration: 0.6 }}
    >
      How It Works
    </motion.h2>
  );
};

export default WorkflowHeading;
