import { FC, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { clusterApiUrl } from "@solana/web3.js";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import { SolanaContextProvider } from "./context/SolanaContext";
import ProtectedRoute from "./context/ProtectedRoute";
import PresentationPage from "./pages/presentation/PresentationPage";
import MarketplacePage from "./pages/marketplace/MarketplacePage";
import ProfilePage from "./pages/profile/ProfilePage";
import PublishPage from "./pages/publish/PublishPage";
import LeaderboardPage from "./pages/leaderboard/LeaderboardPage";
import ChatPage from "./pages/chat/ChatPage";

const App: FC = () => {
  // Use devnet for development, change to mainnet-beta for production
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <SolanaContextProvider>
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
          </SolanaContextProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
