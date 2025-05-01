import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarButtonProps {
  label: string;
  onClick?: () => void;
  to?: string;
  isSectionLink?: boolean;
  active?: boolean;
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({
  label,
  onClick,
  to,
  isSectionLink = false,
  active = false,
}) => {
  const location = useLocation();

  // If it's a section link and has a "to" prop, it's for sections on the presentation page
  if (isSectionLink && to) {
    return (
      <a
        href={to}
        onClick={(e) => {
          e.preventDefault();
          // Only process the section scrolling if onClick is provided
          if (onClick) onClick();
        }}
        className={`px-3 py-2 rounded-md text-sm font-medium 
          ${active ? "text-white" : "text-gray-300 hover:text-white"}
          transition-colors duration-200`}
      >
        {label}
      </a>
    );
  }

  // If it has a "to" prop but is not a section link, it's a regular navigation link
  if (to) {
    return (
      <Link
        to={to}
        className={`px-3 py-2 rounded-md text-sm font-medium 
          ${
            location.pathname === to
              ? "text-white"
              : "text-gray-300 hover:text-white"
          }
          transition-colors duration-200`}
        onClick={onClick}
      >
        {label}
      </Link>
    );
  }

  // If it's just a button (no navigation)
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
    >
      {label}
    </button>
  );
};
