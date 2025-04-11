import React from "react";
import { motion } from "framer-motion";
import FAQCard from "./FAQCard";
import { FAQ } from "../../../types/faq";
import { faqs } from "../../../data/presentationPage.faqs";

interface FAQGridProps {
  faqs: FAQ[];
  isInView: boolean;
  primaryBlue: string;
  containerVariants: any;
  cardVariants: any;
}

export const FAQGrid: React.FC<FAQGridProps> = ({
  faqs,
  isInView,
  primaryBlue,
  containerVariants,
  cardVariants,
}) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {faqs.map((faq) => (
        <FAQCard
          key={faq.id}
          primaryBlue={primaryBlue}
          title={faq.title}
          description={faq.description}
          variants={cardVariants}
        />
      ))}
    </motion.div>
  );
};

export default FAQGrid;
