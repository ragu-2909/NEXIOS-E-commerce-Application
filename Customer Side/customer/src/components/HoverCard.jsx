import React, { useContext, useRef, useState, useEffect, createContext } from 'react';
import { cn } from "../utils"; // Assuming this utility function is in the correct path.

const HoverContext = createContext(undefined);

export const HoverCardContainer = ({
  children,
  className,
  containerClassName,
  width = "w-full",
  height = "h-auto",
}) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
  
    // Adjust divisors to reduce the rotation effect
    const x = (e.clientX - left - width / 2) / 200; // Increased divisor to 100 for subtler rotation
    const y = (e.clientY - top - height / 2) / 200;
  
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };
  

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (containerRef.current) {
      containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
  };

  return (
    <HoverContext.Provider value={[isHovered, setIsHovered]}>
      <div
        className={cn(
          `flex flex-1 items-center justify-center`, // Flex-grow for equal width
          containerClassName,
          width,
          height
        )}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative flex w-full h-full transition-all duration-300 ease-linear",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </HoverContext.Provider>
  );
};


export const HoverCardBody = ({ children, className }) => {
  return (
    <div
      className={cn(
        "  h-full w-full [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}>
      {children}
    </div>
  );
};

export const HoverCardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = useRef(null);
  const [isHovered] = useHover();

  useEffect(() => {
    handleHoverEffect();
  }, [isHovered]);

  const handleHoverEffect = () => {
    if (!ref.current) return;
    if (isHovered) {
      ref.current.style.transform = ` translateZ(${translateZ}px)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  return (
    <Tag
      ref={ref}
      className={cn("w-full h-full transition-all duration-300 ease-linear", className)}
      {...rest}>
      {children}
    </Tag>
  );
};

// Create a custom hook to use the hover context
export const useHover = () => {
  const context = useContext(HoverContext);
  if (context === undefined) {
    throw new Error("useHover must be used within a HoverCardContainer");
  }
  return context;
};
