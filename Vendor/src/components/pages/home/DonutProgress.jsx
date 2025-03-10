import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const DonutProgress = ({
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
  const radius = 50; // Radius of the circle (fixed for this example, but you can adjust dynamically)
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  const percentage = (currentValue / goal) * 100;

  useEffect(() => {
    setProgress(percentage);
  }, [currentValue, goal]);

  // This function will animate the progress from 0 to the given percentage
  const progressAnimation = {
    strokeDashoffset: circumference - (circumference * progress) / 100,
    transition: "stroke-dashoffset 2s ease-in-out",
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Circular Progress SVG */}
      <div className="relative w-full h-full">
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full" // Ensures the SVG takes up 100% of the parent div size
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={barColor} // Use the color passed in the barColor prop
            strokeWidth={strokeWidth}
          />

          {/* Linear Gradient Definition with unique ID */}
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

          {/* Animated Progress Circle with linear gradient */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={`url(#gradient-progress-${uniqueId})`} // Use the unique gradient for the stroke
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            style={progressAnimation}
            transform="rotate(-90 60 60)" // Rotate to start from top
            strokeLinecap="round" // This adds the rounded cap at the end of the progress
          />

          {/* Progress Text with Decimal Precision */}
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-2xl font-bold"
            fill={themeMode === "theme-mode-dark" ? "#ffffff" : "#0000000"}
          >
            {/* {progress.toFixed(1)}% Shows decimal precision */}
            {currentValue+ "★"}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default DonutProgress;
