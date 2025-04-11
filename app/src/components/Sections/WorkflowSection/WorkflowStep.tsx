import React from "react";
import { motion } from "framer-motion";

interface WorkflowStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isLastStep: boolean;
  primaryRed: string;
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({
  icon,
  title,
  description,
  index,
  isLastStep,
  primaryRed,
}) => {
  return (
    <motion.div className="flex items-start gap-8 relative">
      <motion.div
        className="w-[90px] h-[90px] rounded-full flex items-center justify-center text-4xl flex-shrink-0 shadow-lg text-white relative z-10"
        style={{ backgroundColor: "#FFFFFF" }}
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <div className="text-[#0A3363]">{icon}</div>

        <div
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full text-white text-sm flex items-center justify-center font-bold"
          style={{ backgroundColor: primaryRed }}
        >
          {index + 1}
        </div>
      </motion.div>

      {!isLastStep && (
        <motion.div
          className="absolute top-[90px] left-[45px] w-1 bg-white/30"
          style={{ height: "80px" }}
          initial={{ height: 0 }}
          animate={{ height: "80px" }}
          transition={{ duration: 0.8, delay: 0.3 * (index + 1) }}
        >
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-[#CC0000] left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 80, 0],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1,
              delay: index * 0.5,
            }}
          />
        </motion.div>
      )}

      <div className="pt-2 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 flex-1">
        <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-white/90 leading-relaxed">{description}</p>

        <div className="w-16 h-0.5 mt-4 bg-[#CC0000]" />
      </div>
    </motion.div>
  );
};

export default WorkflowStep;
