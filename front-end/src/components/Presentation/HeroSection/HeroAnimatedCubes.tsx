import { motion } from "framer-motion";
import AnimatedCube from "../../AnimatedCube/AnimatedCube";

interface HeroAnimatedCubesProps {
  isInView: boolean;
  primaryColor: string;
  secondaryColor: string;
}

const HeroAnimatedCubes = ({
  isInView,
  primaryColor,
  secondaryColor,
}: HeroAnimatedCubesProps) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <motion.div
        className="absolute right-[10%] top-[20%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.8 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <AnimatedCube size={150} color={primaryColor} />
      </motion.div>

      <motion.div
        className="absolute left-[15%] bottom-[25%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.8 : 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <AnimatedCube size={100} color={secondaryColor} />
      </motion.div>

      <motion.div
        className="absolute right-[20%] bottom-[15%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.8 : 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <AnimatedCube size={180} color={primaryColor} />
      </motion.div>

      <motion.div
        className="absolute left-[20%] top-[15%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.8 : 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <AnimatedCube size={120} color={secondaryColor} />
      </motion.div>
    </div>
  );
};

export default HeroAnimatedCubes;
