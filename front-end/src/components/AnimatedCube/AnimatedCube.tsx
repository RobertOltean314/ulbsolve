import React, { useEffect, useRef } from "react";

interface AnimatedCubeProps {
  size: number;
  color?: string;
  letters?: string[];
  rotationSpeed?: number;
}

const AnimatedCube: React.FC<AnimatedCubeProps> = ({
  size,
  color = "#0A3363",
  letters = ["U", "L", "B", "S"],
  rotationSpeed = 15,
}) => {
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.style.setProperty("--size", `${size}px`);
      cubeRef.current.style.setProperty("--primary-color", color);
      cubeRef.current.style.setProperty(
        "--rotation-duration",
        `${rotationSpeed}s`
      );
    }
  }, [size, color, rotationSpeed]);

  // Derive complementary colors for gradients
  const colorLight =
    color === "#CC0000" ? "rgba(255, 51, 51, 0.7)" : "rgba(46, 92, 153, 0.7)";
  const colorDark =
    color === "#CC0000" ? "rgba(153, 0, 0, 0.7)" : "rgba(6, 17, 42, 0.7)";
  const shadowColor =
    color === "#CC0000"
      ? "rgba(255, 102, 102, 0.5)"
      : "rgba(70, 131, 223, 0.5)";
  const glowColor =
    color === "#CC0000"
      ? "rgba(255, 102, 102, 0.3)"
      : "rgba(70, 131, 223, 0.3)";

  const containerStyle = {
    perspective: "1000px",
    width: `${size}px`,
    height: `${size}px`,
  };

  const cubeStyle = {
    width: "100%",
    height: "100%",
    position: "relative" as const,
    transformStyle: "preserve-3d" as const,
    animation: `rotateCube var(--rotation-duration, ${rotationSpeed}s) infinite ease-in-out`,
  };

  const faceStyle = {
    position: "absolute" as const,
    width: "100%",
    height: "100%",
    opacity: 0.8,
    border: "1px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `inset 0 0 10px ${shadowColor}`,
    transition: "all 0.3s",
    backdropFilter: "blur(2px)",
    overflow: "hidden",
  };

  return (
    <>
      <style>
        {`
          @keyframes rotateCube {
            0% { transform: rotateX(0deg) rotateY(0deg); }
            25% { transform: rotateX(90deg) rotateY(90deg); }
            50% { transform: rotateX(180deg) rotateY(180deg); }
            75% { transform: rotateX(270deg) rotateY(270deg); }
            100% { transform: rotateX(360deg) rotateY(360deg); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }

          .cube-face {
            animation: pulse 3s infinite ease-in-out;
          }

          .cube-face:hover {
            opacity: 1;
            box-shadow: inset 0 0 20px ${glowColor};
          }
        `}
      </style>
      <div style={containerStyle}>
        <div style={cubeStyle} ref={cubeRef}>
          {/* Front */}
          <div
            className="cube-face"
            style={{
              ...faceStyle,
              transform: `translateZ(calc(${size / 2}px))`,
              background: `linear-gradient(145deg, ${colorLight}, ${colorDark})`,
            }}
          >
            <span
              style={{
                fontSize: `${size / 3}px`,
                fontWeight: 800,
                color: "rgba(255, 255, 255, 0.9)",
                textShadow: `0 0 5px ${shadowColor}`,
              }}
            >
              {letters[0]}
            </span>
          </div>

          {/* Back */}
          <div
            className="cube-face"
            style={{
              ...faceStyle,
              transform: `rotateY(180deg) translateZ(calc(${size / 2}px))`,
              background: `linear-gradient(145deg, ${colorLight}, ${colorDark})`,
            }}
          >
            <span
              style={{
                fontSize: `${size / 3}px`,
                fontWeight: 800,
                color: "rgba(255, 255, 255, 0.9)",
                textShadow: `0 0 5px ${shadowColor}`,
              }}
            >
              {letters[1]}
            </span>
          </div>

          {/* Right */}
          <div
            className="cube-face"
            style={{
              ...faceStyle,
              transform: `rotateY(90deg) translateZ(calc(${size / 2}px))`,
              background: `linear-gradient(145deg, ${colorLight}, ${colorDark})`,
            }}
          >
            <span
              style={{
                fontSize: `${size / 3}px`,
                fontWeight: 800,
                color: "rgba(255, 255, 255, 0.9)",
                textShadow: `0 0 5px ${shadowColor}`,
              }}
            >
              {letters[2]}
            </span>
          </div>

          {/* Left */}
          <div
            className="cube-face"
            style={{
              ...faceStyle,
              transform: `rotateY(-90deg) translateZ(calc(${size / 2}px))`,
              background: `linear-gradient(145deg, ${colorLight}, ${colorDark})`,
            }}
          >
            <span
              style={{
                fontSize: `${size / 3}px`,
                fontWeight: 800,
                color: "rgba(255, 255, 255, 0.9)",
                textShadow: `0 0 5px ${shadowColor}`,
              }}
            >
              {letters[3]}
            </span>
          </div>

          {/* Top */}
          <div
            className="cube-face"
            style={{
              ...faceStyle,
              transform: `rotateX(90deg) translateZ(calc(${size / 2}px))`,
              background: `linear-gradient(145deg, ${colorLight}, ${colorDark})`,
            }}
          >
            <div
              style={{
                width: "70%",
                height: "70%",
                background: `radial-gradient(circle, ${glowColor} 0%, rgba(6, 17, 42, 0.1) 70%, transparent 100%)`,
                borderRadius: "50%",
                boxShadow: `0 0 15px ${glowColor}`,
              }}
            ></div>
          </div>

          {/* Bottom */}
          <div
            className="cube-face"
            style={{
              ...faceStyle,
              transform: `rotateX(-90deg) translateZ(calc(${size / 2}px))`,
              background: `linear-gradient(145deg, ${colorLight}, ${colorDark})`,
            }}
          >
            <div
              style={{
                width: "70%",
                height: "70%",
                background: `radial-gradient(circle, ${glowColor} 0%, rgba(6, 17, 42, 0.1) 70%, transparent 100%)`,
                borderRadius: "50%",
                boxShadow: `0 0 15px ${glowColor}`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedCube;
