import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const HalfDonutProgress = ({
  goal,
  currentValue,
  gradientProgressSE,
  gradientProgressM,
  barColor,
  uniqueId,
}) => {
  const [progress, setProgress] = useState(0);
  const themeMode = useSelector((state) => state.theme.mode);
  const strokeWidth = 10; // Stroke width of the circle
  const radius = 50; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Full circumference of the circle
  const halfCircumference = circumference; // Use the full circumference for half donut

  // Calculate progress percentage
  const percentage = goal ? (currentValue / goal) * 100 : 0;

  useEffect(() => {
    setProgress(percentage);
  }, [currentValue, goal]);

  // Progress animation (strokeDashoffset)
  const progressAnimation = {
    strokeDashoffset: halfCircumference - (halfCircumference * progress) / 100,
    transition: "stroke-dashoffset 2s ease-in-out", // Smooth animation
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Half Circular Donut Progress SVG */}
      <div className="relative w-full h-full">
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle (Full Circle) */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={barColor} // Background color of the circle
            strokeWidth={strokeWidth}
            strokeOpacity="0.2" // Light opacity for the background circle
            strokeDasharray={halfCircumference} // Full circumference for the background donut
            strokeDashoffset={halfCircumference} // Offset initially
            transform="rotate(180 60 60)" // Rotate so the donut starts from 3 o'clock (0 degrees)
          />

          {/* Linear Gradient Definition */}
          <defs>
            <linearGradient
              id={`gradient-progress-${uniqueId}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={gradientProgressSE} />
              <stop offset="50%" stopColor={gradientProgressM} />
              <stop offset="100%" stopColor={gradientProgressSE} />
            </linearGradient>
          </defs>

          {/* Animated Half-Circle Progress Circle with linear gradient */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={`url(#gradient-progress-${uniqueId})`} // Gradient stroke
            strokeWidth={strokeWidth}
            strokeDasharray={halfCircumference} // Full circumference for the half donut
            strokeDashoffset={halfCircumference} // Initial offset (empty)
            style={progressAnimation} // Apply progress animation
            transform="rotate(180 60 60)" // Rotate to start progress from 3 o'clock
            strokeLinecap="round" // Rounded stroke end for smooth appearance
          />

          {/* Progress Text with Decimal Precision */}
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-2xl font-bold"
            fill={themeMode === "theme-mode-dark" ? "#ffffff" : "#000000"}
          >
            {currentValue}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default HalfDonutProgress;
