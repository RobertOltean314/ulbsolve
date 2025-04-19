import React, { createContext, useContext, useState } from "react";

interface Commission {
  id: string;
  title: string;
  description: string;
  reward: number;
  status: string;
  createdAt: string;
  daysLeft: number;
  participants: number;
}

interface MarketplaceContextType {
  commissions: Commission[];
  addCommission: (commission: Commission) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(
  undefined
);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [commissions, setCommissions] = useState<Commission[]>([]);

  const addCommission = (commission: Commission) => {
    setCommissions((prev) => [...prev, commission]);
  };

  return (
    <MarketplaceContext.Provider value={{ commissions, addCommission }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
};