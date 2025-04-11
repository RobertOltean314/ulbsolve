import { motion } from "framer-motion";

interface HeroLinesProps {
  isInView: boolean;
  primaryColor: string;
}

const HeroLines = ({ isInView, primaryColor }: HeroLinesProps) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ opacity: 0.15 }}
    aria-hidden="true"
  >
    <motion.line
      x1="25%"
      y1="20%"
      x2="75%"
      y2="80%"
      stroke={primaryColor}
      strokeWidth="0.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: isInView ? 1 : 0,
        opacity: isInView ? 1 : 0,
      }}
      transition={{ duration: 1.5, delay: 0.5 }}
    />
    <motion.line
      x1="80%"
      y1="30%"
      x2="20%"
      y2="70%"
      stroke={primaryColor}
      strokeWidth="0.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: isInView ? 1 : 0,
        opacity: isInView ? 1 : 0,
      }}
      transition={{ duration: 1.5, delay: 0.7 }}
    />
    <motion.line
      x1="40%"
      y1="10%"
      x2="60%"
      y2="90%"
      stroke={primaryColor}
      strokeWidth="0.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: isInView ? 1 : 0,
        opacity: isInView ? 1 : 0,
      }}
      transition={{ duration: 1.5, delay: 0.9 }}
    />
  </svg>
);

export default HeroLines;
