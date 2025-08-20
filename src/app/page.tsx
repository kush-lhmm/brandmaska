"use client";

import DualImageCarousel from "@/components/animated/DualImageCarousel";
import LogoMarquee from "@/components/animated/LogoMarquee";
import Marquee from "@/components/animated/Marquee";
import CaseStudyPage from "@/components/custom/CaseStudy";
import Hero from "@/components/custom/Hero";
import Video from "@/components/custom/Video";
import WhatDefinesUs from "@/components/custom/WhatDefinesUs";

export default function Home() {
  return (
    <main className="bg-white w-full min-h-screen">
      <Hero />
      <Marquee />
      <Video />
      <WhatDefinesUs />
      <LogoMarquee />
      <DualImageCarousel />
      <CaseStudyPage />
    </main>
  );
}