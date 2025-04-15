import React from "react";
import { motion } from "framer-motion";

interface UserTypeCardProps {
  id: number;
  icon: string;
  title: string;
  description: string;
  primaryBlue: string;
}

const UserTypeCard: React.FC<UserTypeCardProps> = ({
  id,
  icon,
  title,
  description,
  primaryBlue,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      key={id}
      className="group relative rounded-xl overflow-hidden"
      variants={cardVariants}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-br from-[#0A3363] to-[#CC0000] opacity-80" />

      <div className="relative h-full bg-white rounded-xl p-8 flex flex-col">
        <motion.div
          className="text-5xl mb-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>

        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: primaryBlue }}
        >
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed flex-grow">{description}</p>

        <div className="w-16 h-1 mt-6 rounded bg-gradient-to-r from-[#0A3363] to-[#CC0000] transform origin-left scale-0 group-hover:scale-100 transition-transform duration-300" />
      </div>
    </motion.div>
  );
};

export default UserTypeCard;
