import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface UserStats {
  completedTasks: number;
  publishedTasks: number;
  reputation: number;
  totalEarned: number;
}
{
  /* DUMMY PAGE*/
}
const ProfilePage: React.FC = () => {
  const { publicKey } = useWallet();
  const [userStats, setUserStats] = useState<UserStats>({
    completedTasks: 0,
    publishedTasks: 0,
    reputation: 0,
    totalEarned: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // This would be replaced with actual API calls
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        setUserStats({
          completedTasks: 12,
          publishedTasks: 5,
          reputation: 4.8,
          totalEarned: 2.45,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (publicKey) {
      fetchUserData();
    }
  }, [publicKey]);

  // Helper function to truncate wallet address
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A1232] pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse bg-[#131b3d] rounded-lg p-8">
            <div className="h-8 bg-[#1f2854] rounded w-1/3 mb-6"></div>
            <div className="h-24 bg-[#1f2854] rounded mb-6"></div>
            <div className="h-64 bg-[#1f2854] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1232] pt-24 px-4 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#131b3d] rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-[#4683df] mb-6">My Profile</h1>

          <div className="mb-8 p-4 bg-[#0c1429] rounded-lg">
            <div className="flex items-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold">
                {publicKey && publicKey.toString().substring(0, 2)}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold">
                  {publicKey
                    ? truncateAddress(publicKey.toString())
                    : "Wallet not connected"}
                </h2>
                <p className="text-gray-400">
                  Reputation: {userStats.reputation}/5.0
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#0c1429] p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Tasks Completed</h3>
              <p className="text-3xl font-bold text-[#4683df]">
                {userStats.completedTasks}
              </p>
            </div>
            <div className="bg-[#0c1429] p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Tasks Published</h3>
              <p className="text-3xl font-bold text-[#4683df]">
                {userStats.publishedTasks}
              </p>
            </div>
            <div className="bg-[#0c1429] p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Earned</h3>
              <p className="text-3xl font-bold text-[#4683df]">
                {userStats.totalEarned} SOL
              </p>
            </div>
            <div className="bg-[#0c1429] p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Current Rank</h3>
              <p className="text-3xl font-bold text-[#4683df]">Bronze</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">
              Recently Completed Tasks
            </h3>
            <div className="bg-[#0c1429] rounded-lg overflow-hidden">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="p-4 border-b border-[#1d2a4d] last:border-b-0"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">
                        Data Visualization Component
                      </h4>
                      <p className="text-sm text-gray-400">
                        Completed 3 days ago
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[#4683df]">0.5 SOL</p>
                      <p className="text-sm text-green-400">Verified ✓</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">My Published Tasks</h3>
            <div className="bg-[#0c1429] rounded-lg overflow-hidden">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="p-4 border-b border-[#1d2a4d] last:border-b-0"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">
                        Create User Authentication Flow
                      </h4>
                      <p className="text-sm text-gray-400">
                        Published 1 week ago
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[#4683df]">0.8 SOL</p>
                      <p className="text-sm text-yellow-400">2 Submissions</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
