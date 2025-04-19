import { MarketplaceProvider } from "./context/MarketplaceContext";
import { SolanaContextProvider } from "./context/SolanaContext";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { FC } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import AppContent from "./AppContent";

const App: FC = () => {
  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

  // Use devnet for development, change to mainnet-beta for production
  const network = "devnet";
  const endpoint = clusterApiUrl(network);

  return (
    <MarketplaceProvider>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <SolanaContextProvider>
              <AppContent />
            </SolanaContextProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </MarketplaceProvider>
  );
};

export default App;
