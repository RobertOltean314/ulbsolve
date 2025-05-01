import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useSolana } from "../../../context/SolanaContext";
import AnimatedCube from "../../AnimatedCube/AnimatedCube";
import { NavbarButton } from "./NavbarButton";
import { MobileMenu } from "./MobileMenu";
import { DisconnectModal } from "./DisconnectModal";
import SettingsDropdown from "./SettingsDropdown";

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { publicKey, disconnect } = useWallet();
  const { balance } = useSolana();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hash changes for section scrolling
  useEffect(() => {
    // Check if we're on the presentation page and have a hash
    if (location.pathname === "/" && location.hash) {
      // Remove the # character
      const sectionId = location.hash.substring(1);

      // Find the element and scroll to it
      const element = document.getElementById(sectionId);
      if (element) {
        // Small delay to ensure the DOM is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.pathname, location.hash]);

  // Format Solana address for display
  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle disconnect actions
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

  // Navigation handlers
  const navigateTo = (path: string) => () => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Section scrolling handler
  const scrollToSection = (sectionId: string) => () => {
    // If we're already on the presentation page
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on another page, navigate to the presentation page with the hash
      navigate(`/#${sectionId}`);
    }

    setIsMobileMenuOpen(false);
  };

  // Determine if we're on the presentation page
  const isPresentationPage = location.pathname === "/";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#06112A] h-[70px] shadow-md"
            : "bg-[#06112A] h-[80px]"
        }`}
      >
        <div className="max-w-7xl h-full mx-auto flex justify-between items-center px-8">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={navigateTo("/")}
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
                <NavbarButton label="Marketplace" to="/marketplace" />
                <NavbarButton label="Publish" to="/publish" />
                <NavbarButton label="Leaderboard" to="/leaderboard" />

                {/* Settings Dropdown - replaces the direct wallet display and adds profile/disconnect */}
                {publicKey && (
                  <SettingsDropdown
                    publicKey={publicKey.toString()}
                    balance={balance || 0}
                    onProfileClick={navigateTo("/profile")}
                    onDisconnectClick={handleDisconnect}
                  />
                )}
              </>
            ) : // Non-authenticated user navigation - presentation page links
            isPresentationPage ? (
              <>
                <NavbarButton
                  label="Challenges"
                  to="#challenges"
                  isSectionLink={true}
                  onClick={scrollToSection("challenges")}
                />
                <NavbarButton
                  label="Features"
                  to="#features"
                  isSectionLink={true}
                  onClick={scrollToSection("features")}
                />
                <NavbarButton
                  label="User Types"
                  to="#user-types"
                  isSectionLink={true}
                  onClick={scrollToSection("user-types")}
                />
                <NavbarButton
                  label="How It Works"
                  to="#workflow"
                  isSectionLink={true}
                  onClick={scrollToSection("workflow")}
                />
                <NavbarButton
                  label="FAQ"
                  to="#faq"
                  isSectionLink={true}
                  onClick={scrollToSection("faq")}
                />
                {/* Wallet connect button always visible for unauthenticated users */}
                <WalletMultiButton className="!bg-[#4683df] hover:!bg-[#5a9aec] !transition-colors" />
              </>
            ) : (
              // Simple wallet button for non-presentation pages when unauthenticated
              <WalletMultiButton className="!bg-[#4683df] hover:!bg-[#5a9aec] !transition-colors" />
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <MobileMenu
            isAuthenticated={isAuthenticated}
            isPresentationPage={isPresentationPage}
            publicKey={publicKey?.toString()}
            balance={balance}
            onChallengesClick={scrollToSection("challenges")}
            onFeaturesClick={scrollToSection("features")}
            onUserTypesClick={scrollToSection("user-types")}
            onWorkflowClick={scrollToSection("workflow")}
            onFAQClick={scrollToSection("faq")}
            onMarketplaceClick={navigateTo("/marketplace")}
            onPublishClick={navigateTo("/publish")}
            onLeaderboardClick={navigateTo("/leaderboard")}
            onProfileClick={navigateTo("/profile")}
            onDisconnectClick={handleDisconnect}
            formatAddress={formatAddress}
            closeMobileMenu={() => setIsMobileMenuOpen(false)}
          />
        )}
      </nav>

      {/* Disconnect Modal */}
      {isDisconnectModalOpen && (
        <DisconnectModal onClose={closeModal} onConfirm={confirmDisconnect} />
      )}

      {/* Add spacing to handle fixed navbar */}
      <div className="h-[80px]"></div>
    </>
  );
};

export default Navbar;
