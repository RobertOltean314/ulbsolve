import React from "react";

const AnimationStyles: React.FC = () => {
  return (
    <style>
      {`
      @keyframes twinkle {
        0%, 100% { opacity: 0.1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.2); }
      }
      
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transition: none !important;
        }
      }
      `}
    </style>
  );
};

export default AnimationStyles;
