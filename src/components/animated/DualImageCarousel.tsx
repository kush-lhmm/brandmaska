"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const DualImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      title: "Contemporary Visuals, Bold Brand Presence",
      description: "We developed a modern imagery style that transforms the trimmer brand into a statement of confidence and innovation. Clean lines, dynamic compositions, and a premium aesthetic come together to create visuals that speak directly to today’s audience.",
      leftImage: "/left-1.gif",
      rightImage: "/right-1.gif",
      logo: "/bsc-logo.png"
    },
    {
      title: "Forging Fantasy into Form",
      description: "We transformed dark fantasy concepts into collectible toy action figures. Each design blends intricate craftsmanship with imaginative storytelling—bringing mythical heroes and villains to life in a way that feels both powerful and timeless.",
      leftImage: "/left-2.gif",
      rightImage: "/right-2.gif",
      logo: "/dark-fantasy.webp"
    },
    {
      title: "Crafting the Aura of Engage",
      description: "We designed a striking visual language for Engage Perfume, blending elegance with contemporary style. The imagery captures the essence of fragrance—sophisticated, magnetic, and memorable—bringing the brand closer to its modern audience.",
      leftImage: "/left-3.gif",
      rightImage: "/right-3.gif",
      logo: "/engage-logo.png"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setDirection(0);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 0 : 1);
    setCurrentSlide(index);
  };

  const leftImageVariants = {
    enter: (direction: number) => ({
      y: direction === 0 ? '-100%' : '100%',
      opacity: 0.8
    }),
    center: {
      y: '0%',
      opacity: 1
    },
    exit: (direction: number) => ({
      y: direction === 0 ? '100%' : '-100%',
      opacity: 0.8
    })
  };

  const rightImageVariants = {
    enter: (direction: number) => ({
      y: direction === 0 ? '100%' : '-100%',
      opacity: 0.8
    }),
    center: {
      y: '0%',
      opacity: 1
    },
    exit: (direction: number) => ({
      y: direction === 0 ? '-100%' : '100%',
      opacity: 0.8
    })
  };

  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="flex flex-col md:flex-row w-full h-full gap-4">

        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <AnimatePresence custom={direction} mode="popLayout" initial={false}>
            <motion.div
              key={`left-${currentSlide}`}
              className="absolute inset-0 w-full h-full"
              custom={direction}
              variants={leftImageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <img
                src={slides[currentSlide].leftImage}
                alt={`Slide ${currentSlide + 1} Left`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 z-10 flex flex-col justify-evenly pb-10 px-4 sm:px-6 md:px-8 lg:px-16">
            <div className='' key={`left-${currentSlide}`}>
              <img
                src={slides[currentSlide].logo}
                alt={`Slide ${currentSlide + 1} Logo`}
                className='w-40 md:w-96 h-auto object-cover'
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentSlide}`}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white max-w-full md:max-w-lg md:ml-8"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 leading-tight"
                >
                  {slides[currentSlide].title}
                </h1>

                <p className="text-sm sm:text-base md:text-lg font-semibold mb-4 sm:mb-8 opacity-80 leading-relaxed">
                  {slides[currentSlide].description}
                </p>

                <motion.button
                  onClick={goToNext}
                  className="inline-flex items-center gap-2 bg-white text-[#2c313f] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full font-semibold transition-colors group text-sm sm:text-base cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <AnimatePresence custom={direction} mode="popLayout" initial={false}>
            <motion.div
              key={`right-${currentSlide}`}
              className="absolute inset-0 w-full h-full"
              custom={direction}
              variants={rightImageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <img
                src={slides[currentSlide].rightImage}
                alt={`Slide ${currentSlide + 1} Right`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default DualImageCarousel;