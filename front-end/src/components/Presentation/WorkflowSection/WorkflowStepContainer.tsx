import React from "react";
import { motion } from "framer-motion";
import WorkflowStep from "./WorkflowStep";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface WorkflowStepsContainerProps {
  steps: Step[];
  isInView: boolean;
  primaryRed: string;
}

const WorkflowStepsContainer: React.FC<WorkflowStepsContainerProps> = ({
  steps,
  isInView,
  primaryRed,
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col gap-12 max-w-3xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {steps.map((step, index) => (
        <motion.div key={index} variants={itemVariants}>
          <WorkflowStep
            icon={step.icon}
            title={step.title}
            description={step.description}
            index={index}
            isLastStep={index === steps.length - 1}
            primaryRed={primaryRed}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WorkflowStepsContainer;
