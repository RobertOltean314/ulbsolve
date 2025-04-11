// Update the Navbar.tsx component to include wallet connection/disconnection

import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import AnimatedCube from "../AnimatedCube/AnimatedCube";
import { NavbarButton } from "./NavbarButton";

interface NavbarProps {
  isScrolled: boolean;
  isAuthenticated?: boolean;
  onLogoClick?: () => void;

  // Presentation page navigation
  onFeatureClick: () => void;
  onWorkflowClick: () => void;
  onUserTypesClick?: () => void;
  onChallengeClick?: () => void;
  onFAQClick?: () => void;
  onTechStackClick?: () => void;

  // Authenticated app navigation
  onMarketplaceClick?: () => void;
  onProfileClick?: () => void;
  onPublishClick?: () => void;
  onLeaderboardClick?: () => void;
  onChatClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isScrolled,
  isAuthenticated = false,
  onLogoClick,
  onFeatureClick,
  onWorkflowClick,
  onUserTypesClick,
  onChallengeClick,
  onFAQClick,
  onTechStackClick,
  onMarketplaceClick,
  onProfileClick,
  onPublishClick,
  onLeaderboardClick,
  onChatClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { disconnect } = useWallet();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#06112A]/95 backdrop-blur h-[70px] shadow-md"
          : "bg-transparent h-[80px]"
      }`}
    >
      <div className="max-w-7xl h-full mx-auto flex justify-between items-center px-8">
        <div className="flex items-center cursor-pointer" onClick={onLogoClick}>
          <span className="text-xl font-bold text-[#4683df] mr-2 hover:text-[#5a9aec] transition-colors duration-200">
            ULBSolve
          </span>
          <div className="ml-2 flex items-center">
            <AnimatedCube size={32} />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            // Authenticated user navigation
            <>
              {onMarketplaceClick && (
                <NavbarButton
                  label="Marketplace"
                  onClick={onMarketplaceClick}
                />
              )}
              {onPublishClick && (
                <NavbarButton label="Publish" onClick={onPublishClick} />
              )}
              {onLeaderboardClick && (
                <NavbarButton
                  label="Leaderboard"
                  onClick={onLeaderboardClick}
                />
              )}
              {onChatClick && (
                <NavbarButton label="Chat" onClick={onChatClick} />
              )}
              {onProfileClick && (
                <NavbarButton
                  label="Profile"
                  onClick={onProfileClick}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
              )}
              {/* Wallet disconnect button */}
              <button
                onClick={() => disconnect()}
                className="bg-[#4683df]/10 hover:bg-[#4683df]/20 text-[#4683df] font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 100 2 1 1 0 000-2zm-2 1a2 2 0 114 0 2 2 0 01-4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Disconnect
              </button>
            </>
          ) : (
            // Non-authenticated user navigation
            <>
              {onChallengeClick && (
                <NavbarButton label="Challenges" onClick={onChallengeClick} />
              )}
              <NavbarButton label="Features" onClick={onFeatureClick} />
              {onUserTypesClick && (
                <NavbarButton label="User Types" onClick={onUserTypesClick} />
              )}
              <NavbarButton label="How It Works" onClick={onWorkflowClick} />
              {onFAQClick && <NavbarButton label="FAQ" onClick={onFAQClick} />}
              {onTechStackClick && (
                <NavbarButton label="Tech Stack" onClick={onTechStackClick} />
              )}
              {/* Wallet connect button */}
              <WalletMultiButton className="!bg-[#4683df] hover:!bg-[#5a9aec] !transition-colors" />
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          {isAuthenticated ? (
            <button
              onClick={() => disconnect()}
              className="bg-[#4683df]/10 hover:bg-[#4683df]/20 text-[#4683df] font-medium py-1 px-3 rounded-lg transition-colors mr-3 text-sm flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 100 2 1 1 0 000-2zm-2 1a2 2 0 114 0 2 2 0 01-4 0z"
                  clipRule="evenodd"
                />
              </svg>
              Disconnect
            </button>
          ) : (
            <WalletMultiButton className="!bg-[#4683df] hover:!bg-[#5a9aec] !transition-colors !py-1 !px-3 !h-auto !text-sm mr-3" />
          )}
          <button className="p-2 text-white" onClick={toggleMobileMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#06112A] shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-3">
            {isAuthenticated ? (
              // Authenticated mobile navigation
              <>
                {onMarketplaceClick && (
                  <NavbarButton
                    label="Marketplace"
                    onClick={onMarketplaceClick}
                    fullWidth
                  />
                )}
                {onPublishClick && (
                  <NavbarButton
                    label="Publish"
                    onClick={onPublishClick}
                    fullWidth
                  />
                )}
                {onLeaderboardClick && (
                  <NavbarButton
                    label="Leaderboard"
                    onClick={onLeaderboardClick}
                    fullWidth
                  />
                )}
                {onChatClick && (
                  <NavbarButton label="Chat" onClick={onChatClick} fullWidth />
                )}
                {onProfileClick && (
                  <NavbarButton
                    label="Profile"
                    onClick={onProfileClick}
                    fullWidth
                  />
                )}
              </>
            ) : (
              // Non-authenticated mobile navigation
              <>
                {onChallengeClick && (
                  <NavbarButton
                    label="Challenges"
                    onClick={onChallengeClick}
                    fullWidth
                  />
                )}
                <NavbarButton
                  label="Features"
                  onClick={onFeatureClick}
                  fullWidth
                />
                {onUserTypesClick && (
                  <NavbarButton
                    label="User Types"
                    onClick={onUserTypesClick}
                    fullWidth
                  />
                )}
                <NavbarButton
                  label="How It Works"
                  onClick={onWorkflowClick}
                  fullWidth
                />
                {onFAQClick && (
                  <NavbarButton label="FAQ" onClick={onFAQClick} fullWidth />
                )}
                {onTechStackClick && (
                  <NavbarButton
                    label="Tech Stack"
                    onClick={onTechStackClick}
                    fullWidth
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
