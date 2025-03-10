import React, { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Helper function to merge class names
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const TypewriterEffect = ({ words, className, cursorClassName }) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { opacity: 1 },
        { duration: 0.3, delay: stagger(0.1), ease: "easeInOut" }
      );
    }
  }, [isInView]);

  return (
    <div className={cn("text-xl font-bold text-center", className)}>
      <motion.div ref={scope} className="inline">
        {words.map((word, wordIdx) => (
          <span key={`word-${wordIdx}`} className=" inline-block">
            {/* Split each word into characters */}
            {word.text.split("").map((char, charIdx) => (
              <motion.span
                key={`char-${wordIdx}-${charIdx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (wordIdx + charIdx) * 0.1 }}
                className={cn("inline-block", word.className)}
              >
                {char}
              </motion.span>
            ))}
            {/* Add a space after each word */}
            {wordIdx < words.length - 1 && (
              <motion.span
                key={`space-${wordIdx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (wordIdx + word.text.length) * 0.1 }}
                className="inline-block"
              >
                &nbsp;
              </motion.span>
            )}
          </span>
        ))}
      </motion.div>
      {/* Blinking cursor */}
      
    </div>
  );
};


// TypewriterEffectSmooth Component
export const TypewriterEffectSmooth = ({ words, className, cursorClassName }) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  return (
    <div className={cn("flex space-x-2", className)}>
      <motion.div
        className="overflow-hidden"
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        transition={{ duration: 2, ease: "linear" }}
      >
        <div className="font-bold text-xl" style={{ whiteSpace: "nowrap" }}>
          {wordsArray.map((word, idx) => (
            <span key={`word-${idx}`} className={cn("inline-block", word.className)}>
              {word.text.map((char, index) => (
                <span key={`char-${index}`}>{char}</span>
              ))}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block w-[4px] h-6 bg-blue-500 rounded-sm",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
