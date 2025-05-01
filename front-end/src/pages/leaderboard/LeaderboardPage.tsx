import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface LeaderboardUser {
  id: string;
  rank: number;
  username: string;
  walletAddress: string;
  tasksCompleted: number;
  tasksPublished: number;
  totalEarned: number;
  reputation: number;
  badge: "bronze" | "silver" | "gold" | "platinum" | "diamond";
}

const LeaderboardPage: React.FC = () => {
  const { publicKey } = useWallet();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "allTime">(
    "monthly"
  );

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setIsLoading(true);
      try {
        // This would be replaced with actual API calls
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockUsers: LeaderboardUser[] = [
          {
            id: "1",
            rank: 1,
            username: "CodeMaster",
            walletAddress: "8xNh...p7k9",
            tasksCompleted: 24,
            tasksPublished: 5,
            totalEarned: 12.5,
            reputation: 4.9,
            badge: "diamond",
          },
          {
            id: "2",
            rank: 2,
            username: "CryptoBuilder",
            walletAddress: "3rMk...j9f2",
            tasksCompleted: 18,
            tasksPublished: 12,
            totalEarned: 10.2,
            reputation: 4.7,
            badge: "platinum",
          },
          {
            id: "3",
            rank: 3,
            username: "SolanaWizard",
            walletAddress: "5tKl...h2d6",
            tasksCompleted: 16,
            tasksPublished: 3,
            totalEarned: 8.6,
            reputation: 4.8,
            badge: "gold",
          },
          {
            id: "4",
            rank: 4,
            username: "DevChampion",
            walletAddress: "7pQr...n5s8",
            tasksCompleted: 15,
            tasksPublished: 9,
            totalEarned: 7.9,
            reputation: 4.6,
            badge: "gold",
          },
          {
            id: "5",
            rank: 5,
            username: "BlockchainDev",
            walletAddress: "2vFg...l0p3",
            tasksCompleted: 13,
            tasksPublished: 7,
            totalEarned: 6.5,
            reputation: 4.5,
            badge: "silver",
          },
        ];

        setUsers(mockUsers);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [timeframe]);

  // Helper function to determine badge color
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "bronze":
        return "bg-amber-700 text-amber-200";
      case "silver":
        return "bg-gray-500 text-gray-100";
      case "gold":
        return "bg-yellow-600 text-yellow-100";
      case "platinum":
        return "bg-blue-700 text-blue-100";
      case "diamond":
        return "bg-purple-700 text-purple-100";
      default:
        return "bg-gray-700 text-gray-100";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A1232] pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-[#1f2854] rounded w-1/4 mb-6"></div>
            <div className="h-12 bg-[#1f2854] rounded mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="h-16 bg-[#1f2854] rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1232] pt-24 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4683df] mb-6">Leaderboard</h1>

        <div className="mb-8 flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeframe === "weekly"
                ? "bg-[#4683df] text-white"
                : "bg-[#131b3d] text-gray-300 hover:bg-[#1d2a4d]"
            }`}
            onClick={() => setTimeframe("weekly")}
          >
            This Week
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeframe === "monthly"
                ? "bg-[#4683df] text-white"
                : "bg-[#131b3d] text-gray-300 hover:bg-[#1d2a4d]"
            }`}
            onClick={() => setTimeframe("monthly")}
          >
            This Month
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeframe === "allTime"
                ? "bg-[#4683df] text-white"
                : "bg-[#131b3d] text-gray-300 hover:bg-[#1d2a4d]"
            }`}
            onClick={() => setTimeframe("allTime")}
          >
            All Time
          </button>
        </div>

        <div className="bg-[#131b3d] rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0c1429] text-gray-400 text-left">
                  <th className="p-4">Rank</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Tasks Completed</th>
                  <th className="p-4">Tasks Published</th>
                  <th className="p-4">Total Earned</th>
                  <th className="p-4">Reputation</th>
                  <th className="p-4">Badge</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const isCurrentUser =
                    publicKey &&
                    user.walletAddress ===
                      publicKey.toString().substring(0, 4) +
                        "..." +
                        publicKey
                          .toString()
                          .substring(publicKey.toString().length - 4);

                  return (
                    <tr
                      key={user.id}
                      className={`border-b border-[#1d2a4d] hover:bg-[#0F1A3A] ${
                        isCurrentUser ? "bg-[#16203d]" : ""
                      }`}
                    >
                      <td className="p-4">
                        <span
                          className={`text-lg font-bold ${
                            user.rank === 1
                              ? "text-yellow-400"
                              : user.rank === 2
                              ? "text-gray-300"
                              : user.rank === 3
                              ? "text-amber-600"
                              : "text-white"
                          }`}
                        >
                          {user.rank}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#4683df] flex items-center justify-center text-xs font-bold">
                            {user.username.substring(0, 2)}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">{user.username}</p>
                            <p className="text-xs text-gray-400">
                              {user.walletAddress}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-lg font-medium">
                          {user.tasksCompleted}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-lg font-medium">
                          {user.tasksPublished}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-lg font-medium">
                          {user.totalEarned} SOL
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-lg font-medium">
                            {user.reputation.toFixed(1)}
                          </span>
                          <svg
                            className="h-4 w-4 text-yellow-400 ml-1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(
                            user.badge
                          )}`}
                        >
                          {user.badge.charAt(0).toUpperCase() +
                            user.badge.slice(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 p-4 bg-[#131b3d] rounded-lg">
          <div className="flex items-center justify-center">
            <button className="px-6 py-2 bg-[#4683df] hover:bg-[#5a9aec] text-white rounded-lg transition-colors">
              View Complete Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
