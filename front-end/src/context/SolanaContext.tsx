import {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { PublicKey } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// Define the Solana context type
interface SolanaContextState {
  connected: boolean;
  publicKey: PublicKey | null;
  balance: number;
  isLoading: boolean;
  fetchBalance: () => Promise<void>;
  signTransaction: ((transaction: any) => Promise<any>) | undefined;
  signAllTransactions: ((transactions: any[]) => Promise<any[]>) | undefined;
  disconnect: (() => Promise<void>) | undefined;
}

const SolanaContext = createContext<SolanaContextState | null>(null);

export function useSolana(): SolanaContextState {
  const context = useContext(SolanaContext);
  if (!context) {
    throw new Error("useSolana must be used within a SolanaProvider");
  }
  return context;
}

interface SolanaContextProviderProps {
  children: ReactNode;
}

export const SolanaContextProvider: FC<SolanaContextProviderProps> = ({
  children,
}) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { connected, publicKey } = wallet;

  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance();
    } else {
      setBalance(0);
    }
  }, [connected, publicKey, connection]);

  const fetchBalance = async (): Promise<void> => {
    if (!publicKey) return;

    try {
      setIsLoading(true);
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / 10 ** 9); // Convert lamports to SOL
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: SolanaContextState = {
    ...wallet,
    balance,
    isLoading,
    fetchBalance,
  };

  return (
    <SolanaContext.Provider value={contextValue}>
      {children}
    </SolanaContext.Provider>
  );
};
