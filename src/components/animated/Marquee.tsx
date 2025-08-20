"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const Marquee = () => {
  const marqueeItems = [
    "Ideas that Scale",
    "Creative Meets Tech",
    "Media with Impact",
    "Future-Ready Branding",
    "Design. Disrupt. Deliver.",
    "Tech-Powered Creativity",
    "Stories that Stick",
    "Innovation in Motion",
    "Bold Moves, Big Results",
    "Your Growth Partner",
  ];

  const marqueeRef = useRef<HTMLDivElement>(null);
  const [marqueeWidth, setMarqueeWidth] = useState(0);

  useEffect(() => {
    if (marqueeRef.current) {
      const width = marqueeRef.current.scrollWidth / 2;
      setMarqueeWidth(width);
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-8 bg-transparent">
      <motion.div
        ref={marqueeRef}
        className="flex"
        animate={{
          x: [0, -marqueeWidth],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 50,
            ease: "linear",
          },
        }}
      >
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <div
            key={index}
            className="flex items-center whitespace-nowrap mx-4"
          >
            <span className="text-3xl md:text-5xl font-bold text-white [text-shadow:_-2px_-2px_0_#2c313f,2px_-2px_0_#000,-2px_2px_0_#000,2px_2px_0_#000]">
              {item}
            </span>

            {index < marqueeItems.length * 2 - 1 && (
              <motion.div
                className="mx-4 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  className="w-6 h-6 md:w-10 md:h-10 fill-black"
                >
                  <circle cx="50" cy="50" r="12" />
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30 * Math.PI) / 180; 
                    const x1 = 50 + Math.cos(angle) * 18;
                    const y1 = 50 + Math.sin(angle) * 18;
                    const x2 = 50 + Math.cos(angle) * 40;
                    const y2 = 50 + Math.sin(angle) * 40;
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="black"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                    );
                  })}
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;