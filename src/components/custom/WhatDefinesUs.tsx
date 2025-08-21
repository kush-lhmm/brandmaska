"use client";

import { ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from 'react';
import Link from "next/link";

const WhatDefinesUs = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const arrowRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    if (sectionRef.current) {
      sectionRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const calculateRotation = () => {
    if (!arrowRef.current || !sectionRef.current) return 0;
    
    const arrowRect = arrowRef.current.getBoundingClientRect();
    const arrowCenterX = arrowRect.left + arrowRect.width / 2;
    const arrowCenterY = arrowRect.top + arrowRect.height / 2;
    
    const deltaX = cursorPosition.x - arrowCenterX;
    const deltaY = cursorPosition.y - arrowCenterY;
    
    return Math.atan2(deltaY, deltaX) * 180 / Math.PI;
  };

  return (
    <section ref={sectionRef} className="relative bg-[#f0ef2c] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
         
          <div className="flex flex-col space-y-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#2c313f] leading-[1.05]">
              WHAT DEFINES US?
            </h2>

            <div className="relative">
              <ArrowRight
                ref={arrowRef}
                aria-hidden="true"
                className="text-[#2c313f] transition-transform duration-100"
                size={120}         
                strokeWidth={3}
                style={{ transform: `rotate(${calculateRotation()}deg)` }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#2c313f] leading-snug">
              We're brand builders at heart, creators by design, tech enthusiasts in practice, and
              integrated at our core.
            </h3>

            <p className="mt-5 text-base md:text-lg text-[#2c313f] leading-relaxed">
              We're on a mission to take the very best of Indian creative talent to the world.
              Driven by a ferocious hunger to create tangible impact for your business, we work with
              in-house specialists, industry partners and technology leaders to push the boundaries
              of creativity and put your brand on the global stage.
            </p>

            <div className="mt-6">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full bg-[#2c313f] px-6 sm:px-8 py-3 text-white text-sm sm:text-base font-semibold transition-colors hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
              >
                Complete Our Outline →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatDefinesUs;