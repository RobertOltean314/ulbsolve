import React, { ReactNode } from "react";

interface NavbarButtonProps {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({
  label,
  onClick,
  icon,
  fullWidth = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        fullWidth ? "w-full" : ""
      } bg-transparent hover:bg-[#4683df]/10 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-${
        fullWidth ? "start" : "center"
      }`}
    >
      {icon && icon}
      {label}
    </button>
  );
};

export default NavbarButton;
