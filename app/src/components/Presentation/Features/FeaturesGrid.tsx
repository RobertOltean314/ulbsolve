import React from "react";
import FeatureCard from "./FeaturesCard";

interface Feature {
  id: string | number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
  isInView: boolean;
  primaryBlue: string;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  isInView,
  primaryBlue,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.id}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          index={index}
          isInView={isInView}
          primaryBlue={primaryBlue}
        />
      ))}
    </div>
  );
};

export default FeatureGrid;
