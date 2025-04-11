import React from "react";
import { motion } from "framer-motion";

interface ChallengeRightColumnProps {
  isInView: boolean;
  primaryBlue: string;
}

const ChallengeRightColumn: React.FC<ChallengeRightColumnProps> = ({
  isInView,
  primaryBlue,
}) => {
  return (
    <motion.div
      className="flex-1 flex flex-col justify-center items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="relative">
        <div
          className="absolute -top-10 -left-10 w-64 h-64 rounded-full opacity-5"
          style={{
            background: `radial-gradient(circle, ${primaryBlue} 0%, transparent 70%)`,
          }}
        />

        <div className="mt-8 p-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg max-w-sm">
          <h4 className="font-semibold mb-2" style={{ color: primaryBlue }}>
            ULBSolve Solution
          </h4>
          <p className="text-sm text-gray-700">
            Our platform bridges these gaps by creating a centralized
            marketplace for students, faculty, and businesses to connect and
            collaborate on meaningful projects.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeRightColumn;
