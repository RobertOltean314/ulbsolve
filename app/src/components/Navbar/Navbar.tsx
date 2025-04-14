import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useSolana } from "../../context/SolanaContext";
import AnimatedCube from "../AnimatedCube/AnimatedCube";
import { NavbarButton } from "./NavbarButton";
import { SettingsDropdown } from "./SettingsDropdown";
import { MobileMenu } from "./MobileMenu";
import { DisconnectModal } from "./DisconnectModal";

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
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const { disconnect, publicKey } = useWallet();
  const { balance } = useSolana();

  // Close mobile menu when an option is selected
  const handleMobileNavigation = (callback?: () => void) => {
    if (callback) callback();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDisconnect = () => {
    setIsDisconnectModalOpen(true);
  };

  const confirmDisconnect = async () => {
    if (disconnect) {
      await disconnect();
    }
    setIsDisconnectModalOpen(false);
  };

  const closeModal = () => {
    setIsDisconnectModalOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#06112A]/95 backdrop-blur h-[70px] shadow-md"
            : "bg-transparent h-[80px]"
        }`}
      >
        <div className="max-w-7xl h-full mx-auto flex justify-between items-center px-8">
          <div
            className="flex items-center cursor-pointer"
            onClick={onLogoClick}
          >
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

                {/* Settings Dropdown (replaces profile, wallet info and disconnect) */}
                {publicKey && (
                  <SettingsDropdown
                    publicKey={publicKey.toString()}
                    balance={balance}
                    onProfileClick={onProfileClick}
                    onDisconnectClick={handleDisconnect}
                  />
                )}
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
                {onFAQClick && (
                  <NavbarButton label="FAQ" onClick={onFAQClick} />
                )}
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
            {!isAuthenticated && (
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
          <MobileMenu
            isAuthenticated={isAuthenticated}
            publicKey={publicKey?.toString()}
            balance={balance}
            onMarketplaceClick={
              onMarketplaceClick
                ? () => handleMobileNavigation(onMarketplaceClick)
                : undefined
            }
            onPublishClick={
              onPublishClick
                ? () => handleMobileNavigation(onPublishClick)
                : undefined
            }
            onLeaderboardClick={
              onLeaderboardClick
                ? () => handleMobileNavigation(onLeaderboardClick)
                : undefined
            }
            onChatClick={
              onChatClick
                ? () => handleMobileNavigation(onChatClick)
                : undefined
            }
            onProfileClick={
              onProfileClick
                ? () => handleMobileNavigation(onProfileClick)
                : undefined
            }
            onChallengeClick={
              onChallengeClick
                ? () => handleMobileNavigation(onChallengeClick)
                : undefined
            }
            onFeatureClick={
              onFeatureClick
                ? () => handleMobileNavigation(onFeatureClick)
                : undefined
            }
            onUserTypesClick={
              onUserTypesClick
                ? () => handleMobileNavigation(onUserTypesClick)
                : undefined
            }
            onWorkflowClick={
              onWorkflowClick
                ? () => handleMobileNavigation(onWorkflowClick)
                : undefined
            }
            onFAQClick={
              onFAQClick ? () => handleMobileNavigation(onFAQClick) : undefined
            }
            onTechStackClick={
              onTechStackClick
                ? () => handleMobileNavigation(onTechStackClick)
                : undefined
            }
            onDisconnectClick={() => handleMobileNavigation(handleDisconnect)}
          />
        )}
      </nav>

      {/* Disconnect confirmation modal */}
      <DisconnectModal
        isOpen={isDisconnectModalOpen}
        onClose={closeModal}
        onConfirm={confirmDisconnect}
      />
    </>
  );
};
