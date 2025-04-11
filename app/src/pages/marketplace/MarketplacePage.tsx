import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  author: string;
  authorWallet: string;
  description: string;
  reward: number;
  image: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  timestamp: string;
  inProgress: boolean;
}

const MarketplacePage: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        // This would be replaced with actual API calls
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockTasks: Task[] = [
          {
            id: "1",
            title: "Create a React component for data visualization",
            author: "DataVizPro",
            authorWallet: "3xtz...j7k2",
            description:
              "Need a reusable component that can visualize network data using D3.js within a React application.",
            reward: 0.8,
            image: "https://example.com/img1.jpg",
            difficulty: "Medium",
            tags: ["React", "D3.js", "Frontend"],
            timestamp: "2023-04-05T10:30:00Z",
            inProgress: false,
          },
          {
            id: "2",
            title: "Build a smart contract for NFT marketplace",
            author: "CryptoChainDev",
            authorWallet: "7hty...p9f3",
            description:
              "Develop a Solana smart contract for an NFT marketplace with royalty features.",
            reward: 2.5,
            image: "https://example.com/img2.jpg",
            difficulty: "Hard",
            tags: ["Solana", "Rust", "Smart Contract"],
            timestamp: "2023-04-03T14:20:00Z",
            inProgress: true,
          },
          {
            id: "3",
            title: "Design a landing page for DeFi project",
            author: "DesignMaster",
            authorWallet: "2fgd...h5j7",
            description:
              "Create a modern and user-friendly landing page design for a new DeFi project.",
            reward: 0.5,
            image: "https://example.com/img3.jpg",
            difficulty: "Easy",
            tags: ["UI/UX", "Figma", "Design"],
            timestamp: "2023-04-06T09:15:00Z",
            inProgress: false,
          },
          {
            id: "4",
            title: "Implement wallet authentication",
            author: "SecureBlockchain",
            authorWallet: "9ikm...l0p2",
            description:
              "Implement secure wallet authentication for a dApp using Phantom and Solflare.",
            reward: 1.2,
            image: "https://example.com/img4.jpg",
            difficulty: "Medium",
            tags: ["Wallet", "Authentication", "Security"],
            timestamp: "2023-04-04T16:45:00Z",
            inProgress: false,
          },
        ];

        setTasks(mockTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    // Apply search filter
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Apply category filter
    if (filter === "all") return matchesSearch;
    if (filter === "inProgress") return matchesSearch && task.inProgress;
    if (filter === "notStarted") return matchesSearch && !task.inProgress;

    // Filter by difficulty
    return (
      matchesSearch && task.difficulty.toLowerCase() === filter.toLowerCase()
    );
  });

  const handleTaskClick = (taskId: string) => {
    // Navigate to task detail page (to be implemented)
    navigate(`/task/${taskId}`);
  };

  const handleAddToWishlist = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    // Add to wishlist functionality
    console.log("Add to wishlist:", taskId);
  };

  const handleNotInterested = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    // Mark as not interested
    console.log("Not interested:", taskId);
  };

  const handleStartTask = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    // Start the task
    console.log("Start task:", taskId);

    // Update UI to show task in progress
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, inProgress: true } : task
      )
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A1232] pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-[#1f2854] rounded w-1/4 mb-6"></div>
            <div className="h-12 bg-[#1f2854] rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-64 bg-[#1f2854] rounded"></div>
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
        <h1 className="text-3xl font-bold text-[#4683df] mb-6">Marketplace</h1>

        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full bg-[#131b3d] border border-[#1d2a4d] rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#4683df]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "all"
                  ? "bg-[#4683df] text-white"
                  : "bg-[#131b3d] text-gray-300 hover:bg-[#1d2a4d]"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "easy"
                  ? "bg-[#4683df] text-white"
                  : "bg-[#131b3d] text-gray-300 hover:bg-[#1d2a4d]"
              }`}
              onClick={() => setFilter("easy")}
            >
              Easy
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "medium"
                  ? "bg-[#4683df] text-white"
                  : "bg-[#131b3d] text-gray-300 hover:bg-[#1d2a4d]"
              }`}
              onClick={() => setFilter("medium")}
            >
              Medium
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "hard"
                  ? "bg-[#4683df] text-white"
                  : "bg-[#131b3d] text-gray-300 hover:bg-[#1d2a4d]"
              }`}
              onClick={() => setFilter("hard")}
            >
              Hard
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "inProgress"
                  ? "bg-[#4683df] text-white"
                  : "bg-[#131b3d] text-gray-300 hover:bg-[#1d2a4d]"
              }`}
              onClick={() => setFilter("inProgress")}
            >
              In Progress
            </button>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="bg-[#131b3d] rounded-lg p-8 text-center">
            <p className="text-xl mb-2">No tasks found</p>
            <p className="text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-[#131b3d] rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
                onClick={() => handleTaskClick(task.id)}
              >
                <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative">
                  <span className="absolute top-2 right-2 bg-[#0A1232] px-3 py-1 rounded-full text-sm font-medium">
                    {task.reward} SOL
                  </span>
                  <h3 className="text-xl font-bold px-4 text-center">
                    {task.title}
                  </h3>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        {task.author.substring(0, 2)}
                      </div>
                      <span className="ml-2 text-sm">{task.author}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.difficulty === "Easy"
                          ? "bg-green-900 text-green-200"
                          : task.difficulty === "Medium"
                          ? "bg-yellow-900 text-yellow-200"
                          : "bg-red-900 text-red-200"
                      }`}
                    >
                      {task.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {task.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {task.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-[#1d2a4d] px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <button
                        className="p-2 bg-[#0c1429] rounded-full hover:bg-[#1d2a4d] transition-colors"
                        onClick={(e) => handleAddToWishlist(e, task.id)}
                        title="Add to wishlist"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                      <button
                        className="p-2 bg-[#0c1429] rounded-full hover:bg-[#1d2a4d] transition-colors"
                        onClick={(e) => handleNotInterested(e, task.id)}
                        title="Not interested"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    {task.inProgress ? (
                      <div className="px-3 py-1 bg-blue-900 text-blue-200 rounded-lg text-xs font-medium flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        In Progress
                      </div>
                    ) : (
                      <button
                        className="px-3 py-1 bg-[#4683df] hover:bg-[#5a9aec] text-white rounded-lg text-sm font-medium"
                        onClick={(e) => handleStartTask(e, task.id)}
                      >
                        Start
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;
