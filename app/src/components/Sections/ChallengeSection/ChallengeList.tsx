import React from "react";
import { motion } from "framer-motion";
import ChallengeItem from "./ChallengeItem";

interface Challenge {
  title: string;
  description: string;
}

interface ChallengeListProps {
  challenges: Challenge[];
  isInView: boolean;
  primaryBlue: string;
}

const ChallengeList: React.FC<ChallengeListProps> = ({
  challenges,
  isInView,
  primaryBlue,
}) => {
  // List item animation variants
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="flex-1"
      variants={listContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <ul className="list-none p-0 space-y-6">
        {challenges.map((challenge, index) => (
          <motion.li
            key={index}
            className="relative pl-8 flex items-start"
            variants={listItemVariants}
          >
            <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#CC0000] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <ChallengeItem
              title={challenge.title}
              description={challenge.description}
              primaryBlue={primaryBlue}
            />
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ChallengeList;
