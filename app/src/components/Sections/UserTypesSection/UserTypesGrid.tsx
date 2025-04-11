import React from "react";
import { motion } from "framer-motion";
import UserTypeCard from "./UserTypesCard";

interface UserType {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface UserTypesGridProps {
  userTypes: UserType[];
  isInView: boolean;
  primaryBlue: string;
}

const UserTypesGrid: React.FC<UserTypesGridProps> = ({
  userTypes,
  isInView,
  primaryBlue,
}) => {
  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
      variants={cardContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {userTypes.map((userType) => (
        <UserTypeCard
          key={userType.id}
          id={userType.id}
          icon={userType.icon}
          title={userType.title}
          description={userType.description}
          primaryBlue={primaryBlue}
        />
      ))}
    </motion.div>
  );
};

export default UserTypesGrid;
