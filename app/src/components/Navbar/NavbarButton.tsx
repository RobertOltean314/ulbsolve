import React, { ReactNode } from "react";

interface NavbarButtonProps {
  label: string;
  onClick: () => void;
  fullWidth?: boolean;
  icon?: ReactNode;
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({
  label,
  onClick,
  fullWidth = false,
  icon,
}) => {
  return (
    <button
      className={`group ${
        fullWidth ? "w-full" : ""
      } text-white hover:text-[#4683df] py-2 px-3 transition-colors duration-200 flex items-center justify-center`}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && <span>{icon}</span>}
      <div className="h-[2px] w-0 bg-[#4683df] transition-all duration-300 group-hover:w-full mt-1 absolute bottom-0 left-0" />
    </button>
  );
};
