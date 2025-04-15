import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import PresentationPage from "./pages/presentation/PresentationPage";
import MarketplacePage from "./pages/marketplace/MarketplacePage";
import ProfilePage from "./pages/profile/ProfilePage";
import PublishPage from "./pages/publish/PublishPage";
import LeaderboardPage from "./pages/leaderboard/LeaderboardPage";
import ChatPage from "./pages/chat/ChatPage";
import ProtectedRoute from "./context/ProtectedRoute";

import "@solana/wallet-adapter-react-ui/styles.css";

/**
 * Main application content component
 * Routes to different pages based on URL path
 * Each page component now uses the Layout component internally
 */
const AppContent: FC = () => {
  return (
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
  );
};

export default AppContent;
