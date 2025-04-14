import { FC, useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";

import PresentationPage from "./pages/presentation/PresentationPage";
import MarketplacePage from "./pages/marketplace/MarketplacePage";
import ProfilePage from "./pages/profile/ProfilePage";
import PublishPage from "./pages/publish/PublishPage";
import LeaderboardPage from "./pages/leaderboard/LeaderboardPage";
import ChatPage from "./pages/chat/ChatPage";
import ProtectedRoute from "./context/ProtectedRoute";

import { Navbar } from "./components/Navbar/Navbar";
import "@solana/wallet-adapter-react-ui/styles.css";

const AppContent: FC = () => {
  const { connected } = useWallet();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation handlers
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (location.pathname !== "/") {
      navigate("/#" + sectionId);
    }
  };

  const navigateToPage = (path: string) => () => navigate(path);

  return (
    <>
      <Navbar
        isScrolled={isScrolled}
        onLogoClick={() => navigate("/")}
        onFeatureClick={() => handleScrollToSection("features")}
        onWorkflowClick={() => handleScrollToSection("workflow")}
        onUserTypesClick={
          !connected ? () => handleScrollToSection("userTypes") : undefined
        }
        onChallengeClick={
          !connected ? () => handleScrollToSection("challenges") : undefined
        }
        onFAQClick={!connected ? () => handleScrollToSection("faq") : undefined}
        onTechStackClick={
          !connected ? () => handleScrollToSection("techStack") : undefined
        }
        onMarketplaceClick={
          connected ? navigateToPage("/marketplace") : undefined
        }
        onProfileClick={connected ? navigateToPage("/profile") : undefined}
        onPublishClick={connected ? navigateToPage("/publish") : undefined}
        onLeaderboardClick={
          connected ? navigateToPage("/leaderboard") : undefined
        }
        onChatClick={connected ? navigateToPage("/chat") : undefined}
        isAuthenticated={connected}
      />

      <Routes>
        <Route path="/" element={<PresentationPage />} />
        <Route
          path="/marketplace"
          element={
            <ProtectedRoute>
              <MarketplacePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/publish"
          element={
            <ProtectedRoute>
              <PublishPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppContent;
