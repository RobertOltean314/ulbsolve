import React, { useState } from "react";
import { CommissionStatus } from "../../types/CommissionStatus";

interface FilterPanelProps {
  statusFilter: CommissionStatus[];
  rewardRangeFilter: [number, number];
  onStatusFilterChange: (statuses: CommissionStatus[]) => void;
  onRewardRangeChange: (range: [number, number]) => void;
  isHorizontal?: boolean;
  onApplyFilters?: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  statusFilter,
  rewardRangeFilter,
  onStatusFilterChange,
  onRewardRangeChange,
  isHorizontal = false,
  onApplyFilters,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleStatus = (status: CommissionStatus) => {
    if (statusFilter.includes(status)) {
      onStatusFilterChange(statusFilter.filter((s) => s !== status));
    } else {
      onStatusFilterChange([...statusFilter, status]);
    }
  };

  const handleMinRewardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onRewardRangeChange([value, rewardRangeFilter[1]]);
    }
  };

  const handleMaxRewardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onRewardRangeChange([rewardRangeFilter[0], value]);
    }
  };

  // Helper to get user-friendly status names
  const getStatusDisplayName = (status: CommissionStatus): string => {
    switch (status) {
      case CommissionStatus.InProgress:
        return "In Progress";
      case CommissionStatus.UnderReview:
        return "Under Review";
      case CommissionStatus.PendingCancellation:
        return "Pending Cancellation";
      default:
        return status;
    }
  };

  // Helper to get status badge class
  const getStatusBadgeClass = (status: CommissionStatus): string => {
    switch (status) {
      case CommissionStatus.Open:
        return "bg-green-400/20 text-green-400";
      case CommissionStatus.InProgress:
        return "bg-blue-400/20 text-blue-400";
      case CommissionStatus.UnderReview:
        return "bg-yellow-400/20 text-yellow-400";
      case CommissionStatus.Completed:
        return "bg-purple-400/20 text-purple-400";
      case CommissionStatus.PendingCancellation:
        return "bg-orange-400/20 text-orange-400";
      case CommissionStatus.Cancelled:
        return "bg-red-400/20 text-red-400";
      case CommissionStatus.Disputed:
        return "bg-orange-400/20 text-orange-400";
      default:
        return "bg-gray-400/20 text-gray-400";
    }
  };

  return (
    <div
      className={`bg-[#0A1A3C] rounded-lg shadow-md border border-gray-800 ${
        isHorizontal ? "w-full" : ""
      }`}
    >
      {/* Header with expand/collapse for mobile */}
      {!isHorizontal && (
        <div
          className="flex justify-between items-center p-4 cursor-pointer lg:cursor-default"
          onClick={toggleExpand}
        >
          <h3 className="text-lg font-semibold text-white">Filters</h3>
          <button className="lg:hidden text-[#4683df]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Filter content - shown/hidden on mobile based on isExpanded, always visible on desktop or in horizontal mode */}
      <div
        className={`
        ${!isHorizontal && !isExpanded ? "hidden lg:block" : "block"} 
        p-4 ${!isHorizontal ? "pt-0" : ""}
        ${
          isHorizontal
            ? "lg:flex lg:flex-row lg:flex-wrap lg:gap-6 lg:items-center"
            : ""
        }
      `}
      >
        {/* Status Filter */}
        <div
          className={`mb-6 ${
            isHorizontal ? "lg:mb-0 lg:flex-1 min-w-[200px]" : ""
          }`}
        >
          <h4 className="text-white font-medium mb-2">Status</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(CommissionStatus).map((status) => (
              <label
                key={status}
                className={`flex items-center px-3 py-2 rounded cursor-pointer ${
                  statusFilter.includes(status)
                    ? `${getStatusBadgeClass(status)} border border-current`
                    : "text-gray-300 bg-[#162A4C] hover:bg-[#1c345a]"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={statusFilter.includes(status)}
                  onChange={() => toggleStatus(status)}
                />
                <span>{getStatusDisplayName(status)}</span>
                {statusFilter.includes(status) && (
                  <svg
                    className="ml-auto h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z"
                    />
                  </svg>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Reward Range Filter */}
        <div className={`${isHorizontal ? "lg:flex-1 min-w-[200px]" : ""}`}>
          <h4 className="text-white font-medium mb-2">Reward Range (SOL)</h4>
          <div
            className={`grid grid-cols-2 gap-4 ${
              isHorizontal ? "lg:flex lg:items-center" : ""
            }`}
          >
            <div>
              <label className="block text-xs text-gray-400 mb-1">Min</label>
              <input
                type="number"
                min="0"
                step="0.1"
                className="w-full bg-[#162A4C] border border-gray-700 rounded px-3 py-2 text-white"
                value={rewardRangeFilter[0]}
                onChange={handleMinRewardChange}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Max</label>
              <input
                type="number"
                min="0"
                step="0.1"
                className="w-full bg-[#162A4C] border border-gray-700 rounded px-3 py-2 text-white"
                value={rewardRangeFilter[1]}
                onChange={handleMaxRewardChange}
              />
            </div>
          </div>
        </div>

        {/* Apply Filters Button - Only visible in horizontal mode */}
        {isHorizontal && onApplyFilters && (
          <div className="mt-4 lg:mt-0 lg:ml-auto">
            <button
              className="bg-[#4683df] hover:bg-[#5a9aec] text-white px-4 py-2 rounded-lg transition-colors"
              onClick={onApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
