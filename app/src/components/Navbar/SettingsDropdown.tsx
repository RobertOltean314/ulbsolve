import React, { useState, useRef, useEffect } from "react";
import { formatWalletAddress, formatSolAmount } from "../../utils/format";

interface SettingsDropdownProps {
  publicKey: string;
  balance: number;
  onProfileClick?: () => void;
  onDisconnectClick: () => void;
}

export const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
  publicKey,
  balance,
  onProfileClick,
  onDisconnectClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-[#4683df]/10 hover:bg-[#4683df]/20 text-[#4683df] font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
      >
        Settings
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ml-1 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#0A1A3C] rounded-lg shadow-lg overflow-hidden z-50">
          <div className="p-3 border-b border-gray-700">
            <h3 className="text-white text-sm font-semibold">User Settings</h3>
          </div>

          <div className="py-1">
            {/* Profile Button */}
            <button
              onClick={() => {
                if (onProfileClick) onProfileClick();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-[#162A4C] flex items-center text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3 text-[#4683df]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              View Profile
            </button>

            {/* Wallet Address */}
            <div className="w-full text-left px-4 py-2 text-gray-300 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3 text-[#4683df]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path
                  fillRule="evenodd"
                  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Wallet</span>
                <span className="text-sm">
                  {formatWalletAddress(publicKey)}
                </span>
              </div>
            </div>

            {/* Balance */}
            <div className="w-full text-left px-4 py-2 text-gray-300 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3 text-[#4683df]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Balance</span>
                <span className="text-sm font-medium text-[#4683df]">
                  {formatSolAmount(balance)}
                </span>
              </div>
            </div>

            {/* Disconnect Button */}
            <button
              onClick={() => {
                onDisconnectClick();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#162A4C] flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 100 2 1 1 0 000-2zm-2 1a2 2 0 114 0 2 2 0 01-4 0z"
                  clipRule="evenodd"
                />
              </svg>
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
