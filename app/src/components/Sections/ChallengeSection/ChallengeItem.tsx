import React from "react";

interface ChallengeItemProps {
  title: string;
  description: string;
  primaryBlue: string;
}

const ChallengeItem: React.FC<ChallengeItemProps> = ({
  title,
  description,
  primaryBlue,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-1" style={{ color: primaryBlue }}>
        {title}
      </h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default ChallengeItem;
