import React from "react";
import { Link, useLocation } from "react-router-dom";

interface MobileMenuProps {
  isAuthenticated: boolean;
  isPresentationPage: boolean;
  publicKey?: string;
  balance?: number;
  onChallengesClick: () => void;
  onFeaturesClick: () => void;
  onUserTypesClick: () => void;
  onWorkflowClick: () => void;
  onFAQClick: () => void;
  onMarketplaceClick: () => void;
  onPublishClick: () => void;
  onLeaderboardClick: () => void;
  onProfileClick: () => void;
  onDisconnectClick: () => void;
  formatAddress: (address: string) => string;
  closeMobileMenu: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isAuthenticated,
  isPresentationPage,
  publicKey,
  balance,
  onChallengesClick,
  onFeaturesClick,
  onUserTypesClick,
  onWorkflowClick,
  onFAQClick,
  onMarketplaceClick,
  onPublishClick,
  onLeaderboardClick,
  onProfileClick,
  onDisconnectClick,
  formatAddress,
  closeMobileMenu,
}) => {
  const location = useLocation();

  // Function to determine if a nav link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Handle section link click
  const handleSectionClick =
    (callback: () => void) => (e: React.MouseEvent) => {
      e.preventDefault();
      callback();
      closeMobileMenu();
    };

  return (
    <div className="md:hidden bg-[#06112A] border-t border-gray-700">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {isAuthenticated ? (
          // Authenticated mobile navigation
          <>
            <Link
              to="/marketplace"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/marketplace")
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={closeMobileMenu}
            >
              Marketplace
            </Link>
            <Link
              to="/publish"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/publish")
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={closeMobileMenu}
            >
              Publish
            </Link>
            <Link
              to="/leaderboard"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/leaderboard")
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={closeMobileMenu}
            >
              Leaderboard
            </Link>
            <Link
              to="/profile"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/profile")
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={closeMobileMenu}
            >
              Profile
            </Link>

            {/* Wallet info for mobile */}
            {publicKey && (
              <div className="block px-3 py-2 rounded-md text-base font-medium text-yellow-500">
                {balance?.toFixed(2)} SOL | {formatAddress(publicKey)}
              </div>
            )}

            {/* Disconnect button for mobile */}
            <button
              onClick={onDisconnectClick}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Disconnect
            </button>
          </>
        ) : // Non-authenticated mobile navigation
        isPresentationPage ? (
          <>
            <a
              href="#challenges"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={handleSectionClick(onChallengesClick)}
            >
              Challenges
            </a>
            <a
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={handleSectionClick(onFeaturesClick)}
            >
              Features
            </a>
            <a
              href="#user-types"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={handleSectionClick(onUserTypesClick)}
            >
              User Types
            </a>
            <a
              href="#workflow"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={handleSectionClick(onWorkflowClick)}
            >
              How It Works
            </a>
            <a
              href="#faq"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={handleSectionClick(onFAQClick)}
            >
              FAQ
            </a>
          </>
        ) : null}
      </div>
    </div>
  );
};
