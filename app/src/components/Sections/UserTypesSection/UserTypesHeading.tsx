import React from "react";
import { motion } from "framer-motion";

interface UserTypesHeadingProps {
  isInView: boolean;
  primaryBlue: string;
}

const UserTypesHeading: React.FC<UserTypesHeadingProps> = ({
  isInView,
  primaryBlue,
}) => {
  return (
    <motion.h2
      className="text-3xl md:text-4xl font-bold mb-16 text-center"
      style={{ color: primaryBlue }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
      transition={{ duration: 0.6 }}
    >
      Who Can Benefit
    </motion.h2>
  );
};

export default UserTypesHeading;
