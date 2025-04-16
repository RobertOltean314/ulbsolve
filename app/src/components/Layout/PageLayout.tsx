import React, { ReactNode } from "react";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer";

import { useSolana } from "../../context/SolanaContext";
interface PageLayoutProps {
  children: ReactNode;
  // Optional props to control layout behavior
  hideFooter?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  hideFooter = false,
  fullWidth = false,
  className = "",
}) => {
  const { connected } = useSolana();

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-white font-inter">
      {/* Navbar - always present */}
      <Navbar isAuthenticated={connected} />

      {/* Main content area */}
      <main className={`flex-grow ${className}`}>
        {fullWidth ? (
          children
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {children}
          </div>
        )}
      </main>

      {/* Footer - optional */}
      {!hideFooter && <Footer />}
    </div>
  );
};
