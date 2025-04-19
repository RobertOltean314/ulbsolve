import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommissionStatus } from "../../types/CommissionStatus";
import SearchBar from "../../components/Marketplace/SearchBar";
import { CommissionCard } from "../../components/Marketplace/CommissionCard";
import { MOCK_COMMISSIONS } from "../../data/mockCommissions";
import { PageLayout } from "../../components/Layout/PageLayout";
import { useMarketplace } from "../../context/MarketplaceContext";

const MarketplacePage: React.FC = () => {
  const { commissions } = useMarketplace();

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CommissionStatus[]>([]);
  const [rewardRangeFilter, setRewardRangeFilter] = useState<[number, number]>([
    0, 100,
  ]);
  const [sortOption, setSortOption] = useState("newest");
  const [userWishlist, setUserWishlist] = useState<string[]>([]);
  const [userNotInterested, setUserNotInterested] = useState<string[]>([]);
  const [userWorkingOn, setUserWorkingOn] = useState<string[]>([]);

  // Filter and sort commissions based on current filters
  const filteredCommissions = MOCK_COMMISSIONS.filter((commission) => {
    // Filter by search query
    if (
      searchQuery &&
      !commission.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !commission.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by status
    if (statusFilter.length > 0 && !statusFilter.includes(commission.status)) {
      return false;
    }

    // Filter by reward range
    if (
      commission.reward < rewardRangeFilter[0] ||
      commission.reward > rewardRangeFilter[1]
    ) {
      return false;
    }

    // Don't show not interested items
    if (userNotInterested.includes(commission.id)) {
      return false;
    }

    return true;
  });

  // Sort commissions
  const sortedCommissions = [...filteredCommissions].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "highest-reward":
        return b.reward - a.reward;
      case "lowest-reward":
        return a.reward - b.reward;
      case "deadline-soon":
        return a.daysLeft - b.daysLeft;
      case "most-popular":
        return b.participants - a.participants;
      default:
        return 0;
    }
  });

  const handleCommissionClick = (id: string) => {
    navigate(`/commission/${id}`);
  };

  const handleToggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserWishlist((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleToggleNotInterested = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserNotInterested((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleToggleWorkingOn = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserWorkingOn((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter([]);
    setRewardRangeFilter([0, 100]);
    setSortOption("newest");
  };

  // const getActiveFiltersCount = () => {
  //   let count = 0;
  //   if (searchQuery) count++;
  //   if (statusFilter.length > 0) count++;
  //   if (rewardRangeFilter[0] > 0 || rewardRangeFilter[1] < 100) count++;
  //   return count;
  // };

  // const activeFiltersCount = getActiveFiltersCount();

  return (
    <PageLayout className="pb-12">
      {/* Header with enhanced styling */}
      <div className="relative bg-[#0A1A3C] px-4 md:px-8 -mx-4 sm:-mx-6 lg:-mx-8 border-b border-gray-700 shadow-lg">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#4683df]"></div>
        <div className="max-w-7xl mx-auto relative z-10 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Marketplace
              </h1>
              <p className="text-gray-300 mt-1 max-w-xl text-sm">
                Browse and discover projects and opportunities from the ULBS
                community
              </p>
            </div>
            <div className="mt-2 sm:mt-0">
              <div className="flex items-center space-x-2 text-xs bg-[#162A4C] px-3 py-1.5 rounded-lg border border-gray-700">
                <span className="text-gray-400">Available commissions:</span>
                <span className="text-[#4683df] font-bold">
                  {MOCK_COMMISSIONS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search Row */}
      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Search Bar - Takes 4 columns on large screens */}
          <div className="lg:col-span-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={() => {
                /* Handle search */
              }}
              placeholder="Search by title or description..."
            />
          </div>

          {/* Sort Dropdown - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="relative">
              <select
                className="w-full px-4 py-2.5 bg-[#162A4C] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4683df] focus:border-[#4683df]"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest-reward">Highest Reward</option>
                <option value="lowest-reward">Lowest Reward</option>
                <option value="deadline-soon">Deadline Soon</option>
                <option value="most-popular">Most Popular</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commissions Grid with enhanced styling */}
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commissions.map((commission) => (
            <div
              key={commission.id}
              className="transition-transform duration-200 hover:translate-y-[-4px]"
            >
              <CommissionCard
                id={commission.id}
                title={commission.title}
                description={commission.description}
                reward={commission.reward}
                status={commission.status as CommissionStatus}
                createdAt={commission.createdAt}
                daysLeft={commission.daysLeft}
                participants={commission.participants}
                isInWishlist={userWishlist.includes(commission.id)}
                isNotInterested={userNotInterested.includes(commission.id)}
                isWorkingOn={userWorkingOn.includes(commission.id)}
                onClick={handleCommissionClick}
                onWishlistToggle={handleToggleWishlist}
                onNotInterestedToggle={handleToggleNotInterested}
                onWorkingOnToggle={handleToggleWorkingOn}
              />
            </div>
          ))}
        </div>

        {/* Empty State - Enhanced styling */}
        {sortedCommissions.length === 0 && (
          <div className="text-center py-16 bg-[#162A4C] rounded-lg border border-gray-800 shadow-lg">
            <div className="relative w-20 h-20 mx-auto">
              <svg
                className="h-20 w-20 text-gray-600 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="absolute bottom-0 right-0 bg-[#4683df] rounded-full p-1.5 border-2 border-[#121212]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
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
            </div>
            <h3 className="mt-6 text-2xl font-medium text-white">
              No commissions found
            </h3>
            <p className="mt-2 text-gray-400 max-w-md mx-auto">
              We couldn't find any commissions that match your current filters.
              Try adjusting your search or filter criteria.
            </p>
            <div className="mt-6">
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-5 py-2.5 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-[#4683df] hover:bg-[#5a9aec] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Reset all filters
              </button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MarketplacePage;
