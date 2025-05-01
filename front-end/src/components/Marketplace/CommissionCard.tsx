import React from "react";
import { CommissionStatus } from "../../types/CommissionStatus";

interface CommissionCardProps {
  id: string;
  title: string;
  description: string;
  reward: number;
  status: CommissionStatus;
  createdAt: string;
  daysLeft: number;
  participants: number;
  isInWishlist?: boolean;
  isNotInterested?: boolean;
  isWorkingOn?: boolean;
  onClick: (id: string) => void;
  onWishlistToggle: (id: string, e: React.MouseEvent) => void;
  onNotInterestedToggle: (id: string, e: React.MouseEvent) => void;
  onWorkingOnToggle: (id: string, e: React.MouseEvent) => void;
}

export const CommissionCard: React.FC<CommissionCardProps> = ({
  id,
  title,
  description,
  reward,
  status,
  createdAt,
  daysLeft,
  participants,
  isInWishlist = false,
  isNotInterested = false,
  isWorkingOn = false,
  onClick,
  onWishlistToggle,
  onNotInterestedToggle,
  onWorkingOnToggle,
}) => {
  // Status badge styles based on status
  const getStatusStyles = () => {
    switch (status) {
      case CommissionStatus.Open:
        return "bg-green-400/20 text-green-400 border-green-400/50";
      case CommissionStatus.InProgress:
        return "bg-blue-400/20 text-blue-400 border-blue-400/50";
      case CommissionStatus.UnderReview:
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/50";
      case CommissionStatus.Completed:
        return "bg-purple-400/20 text-purple-400 border-purple-400/50";
      case CommissionStatus.PendingCancellation:
        return "bg-orange-400/20 text-orange-400 border-orange-400/50";
      case CommissionStatus.Cancelled:
        return "bg-red-400/20 text-red-400 border-red-400/50";
      case CommissionStatus.Disputed:
        return "bg-orange-400/20 text-orange-400 border-orange-400/50";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/50";
    }
  };

  // Format reward to 2 decimal places
  const formattedReward = reward.toFixed(2);

  // Get display name for status
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

  // Get urgency style based on days left
  const getUrgencyStyle = () => {
    if (daysLeft <= 1) return "text-red-400";
    if (daysLeft <= 3) return "text-orange-400";
    if (daysLeft <= 7) return "text-yellow-400";
    return "text-gray-400";
  };

  return (
    <div
      className="bg-[#0A1A3C] rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-[#4683df] transition-all duration-300 cursor-pointer h-[320px] flex flex-col"
      onClick={() => onClick(id)}
    >
      {/* Card header with status and reward */}
      <div className="p-3 bg-[#162A4C] border-b border-gray-800 flex justify-between items-center h-[48px]">
        {/* Status badge */}
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold border shadow-sm ${getStatusStyles()}`}
        >
          {getStatusDisplayName(status)}
        </span>

        {/* Reward badge */}
        <div className="bg-[#0A1A3C] px-2 py-1 rounded-lg flex items-center shadow-md border border-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3 mr-1 text-[#F3BA2F]"
          >
            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
            <path
              fillRule="evenodd"
              d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
              clipRule="evenodd"
            />
            <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
          </svg>
          <span className="font-semibold text-[#F3BA2F] text-xs">
            {formattedReward} SOL
          </span>
        </div>
      </div>

      {/* Commission Details - Main content with fixed height */}
      <div className="p-4 flex-grow flex flex-col h-[220px] overflow-hidden">
        {/* Title with fixed height */}
        <h3 className="text-lg font-bold text-white line-clamp-1 mb-2 hover:text-[#4683df] transition-colors duration-200">
          {title}
        </h3>

        {/* Description with fixed height */}
        <div className="mb-3 h-[40px] overflow-hidden">
          <p className="text-gray-300 text-sm line-clamp-2">{description}</p>
        </div>

        {/* Commission Meta Information - fixed height layout */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {/* Deadline indicator with urgency color */}
          <div
            className={`flex items-center ${getUrgencyStyle()} bg-[#162A4C] p-1.5 rounded-md border border-gray-700`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs">
              {daysLeft} {daysLeft === 1 ? "day" : "days"} left
            </span>
          </div>

          {/* Participants indicator */}
          <div className="flex items-center text-gray-400 bg-[#162A4C] p-1.5 rounded-md border border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span className="text-xs">
              {participants || 0} {participants === 1 ? "person" : "people"}
            </span>
          </div>
        </div>

        {/* Created date in a more elegant format */}
        <div className="text-xs text-gray-500 mb-3">
          <span>Created: {createdAt}</span>
        </div>

        {/* Status indicator bar */}
        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden mb-1">
          <div
            className={`h-full ${
              status === CommissionStatus.Open
                ? "bg-green-500"
                : status === CommissionStatus.InProgress
                ? "bg-blue-500"
                : status === CommissionStatus.UnderReview
                ? "bg-yellow-500"
                : status === CommissionStatus.Completed
                ? "bg-purple-500"
                : status === CommissionStatus.Cancelled
                ? "bg-red-500"
                : "bg-orange-500"
            }`}
            style={{
              width:
                status === CommissionStatus.Open
                  ? "20%"
                  : status === CommissionStatus.InProgress
                  ? "40%"
                  : status === CommissionStatus.UnderReview
                  ? "60%"
                  : status === CommissionStatus.Completed
                  ? "100%"
                  : status === CommissionStatus.Cancelled
                  ? "100%"
                  : "80%",
            }}
          ></div>
        </div>
      </div>

      {/* Action Buttons - Fixed height footer */}
      <div className="flex justify-between items-center p-3 bg-[#0c1a36] border-t border-gray-800 h-[52px]">
        <div className="flex space-x-1">
          {/* Wishlist Button */}
          <button
            className={`p-1.5 rounded-full transition-all hover:bg-[#162A4C] ${
              isInWishlist
                ? "text-[#F3BA2F]"
                : "text-gray-400 hover:text-[#F3BA2F]"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onWishlistToggle(id, e);
            }}
            aria-label={
              isInWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill={isInWishlist ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={isInWishlist ? 0 : 2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Not Interested Button */}
          <button
            className={`p-1.5 rounded-full transition-all hover:bg-[#162A4C] ${
              isNotInterested
                ? "text-red-500"
                : "text-gray-400 hover:text-red-500"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onNotInterestedToggle(id, e);
            }}
            aria-label={
              isNotInterested ? "Mark as interested" : "Not interested"
            }
            title={isNotInterested ? "Mark as interested" : "Not interested"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill={isNotInterested ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={isNotInterested ? 0 : 2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Working On Button */}
          <button
            className={`p-1.5 rounded-full transition-all hover:bg-[#162A4C] ${
              isWorkingOn
                ? "text-green-500"
                : "text-gray-400 hover:text-green-500"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onWorkingOnToggle(id, e);
            }}
            aria-label={
              isWorkingOn ? "Unmark as working on" : "Mark as working on"
            }
            title={isWorkingOn ? "Unmark as working on" : "Mark as working on"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill={isWorkingOn ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={isWorkingOn ? 0 : 2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        {/* View Details Button */}
        <button
          className="px-3 py-1.5 bg-[#4683df] hover:bg-[#5a9aec] text-white rounded text-xs transition-colors flex items-center space-x-1 shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            onClick(id);
          }}
        >
          <span>View Details</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3 h-3 ml-1"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
