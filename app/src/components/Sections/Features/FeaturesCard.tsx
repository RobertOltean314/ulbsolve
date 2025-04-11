import React from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isInView: boolean;
  primaryBlue: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  index,
  isInView,
  primaryBlue,
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      className="bg-white rounded-xl p-8 transition-all duration-300 backdrop-blur border border-white/10 hover:shadow-xl group relative overflow-hidden"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        y: -12,
        transition: { duration: 0.3 },
      }}
    >
      {/* Accent corner */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-[#CC0000] to-[#FF3333] rotate-45 transform origin-bottom-left opacity-90"></div>

      {/* Icon with subtle animation */}
      <motion.div
        className="text-5xl mb-6"
        style={{ color: primaryBlue }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>

      <h3 className="text-xl font-semibold mb-4" style={{ color: primaryBlue }}>
        {title}
      </h3>

      <p className="text-gray-600 leading-relaxed">{description}</p>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

export default FeatureCard;
