"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !boxRef.current) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1) QUICK EXPANSION: finishes early in the scroll
        gsap.fromTo(
          boxRef.current,
          { scale: 0.76, opacity: 0.9, yPercent: 6, borderRadius: "28px", boxShadow: "0 60px 160px rgba(0,0,0,0.4)" },
          {
            scale: 1,
            opacity: 1,
            yPercent: 0,
            borderRadius: "0px",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: "top 95%",    
              end: "top 70%",       // finish expansion quickly
              scrub: true,
              fastScrollEnd: true,  // completes on fast flicks too
            },
          }
        );

        // Optional: a tiny fade polish on first reveal (fires once)
        gsap.fromTo(
          boxRef.current,
          { opacity: 0.85 },
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: "top 95%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
  
    <section ref={sectionRef} className="relative w-full h-[220svh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <motion.div
          ref={boxRef}
          initial={{ scale: 0.9, opacity: 0.95 }}
          className="relative mx-auto h-[100svh] w-full will-change-transform transform-gpu"
        >
          <video
            className="h-full w-full object-cover select-none pointer-events-none [contain:paint_layout_style] [backface-visibility:hidden]"
            playsInline
            autoPlay
            muted
            loop
            preload="auto"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_58%,rgba(0,0,0,0.55))]" />
        </motion.div>
      </div>
    </section>
  );
}