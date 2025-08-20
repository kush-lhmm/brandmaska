"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const DualImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Discover Amazing Adventures",
      subtitle: "Embark on journeys that will transform your perspective",
      description: "Experience the world like never before with our curated collection of extraordinary destinations."
    },
    {
      title: "Innovation Meets Excellence",
      subtitle: "Where cutting-edge technology creates possibilities",
      description: "Pushing boundaries and redefining what's possible in the digital landscape."
    },
    {
      title: "Crafted with Precision",
      subtitle: "Every detail matters in our pursuit of perfection",
      description: "Meticulously designed experiences that elevate your everyday interactions."
    },
    {
      title: "Future Forward Thinking",
      subtitle: "Building tomorrow's solutions today",
      description: "Revolutionary approaches that shape the way we connect and create."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const leftImageVariants = {
    initial: { y: '-30%', opacity: 0.7 },
    animate: { y: '0%', opacity: 1 },
    exit: { y: '30%', opacity: 0.7 }
  };

  const rightImageVariants = {
    initial: { y: '30%', opacity: 0.7 },
    animate: { y: '0%', opacity: 1 },
    exit: { y: '-30%', opacity: 0.7 }
  };

  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="flex flex-col md:flex-row w-full h-full">

        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${currentSlide}`}
              className="absolute inset-0 w-full h-full"
              variants={leftImageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <img
                src="/carousel.jpg"
                alt={`Slide ${currentSlide + 1} Left`}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black opacity-70" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 z-10 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentSlide}`}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white max-w-full md:max-w-lg"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
                  {slides[currentSlide].title}
                </h1>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-3 sm:mb-6 opacity-90">
                  {slides[currentSlide].subtitle}
                </h2>
                <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-8 opacity-80 leading-relaxed">
                  {slides[currentSlide].description}
                </p>

                <motion.button
                  onClick={nextSlide}
                  className="inline-flex items-center gap-2 bg-white text-[#2c313f] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors group text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next Adventure
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${currentSlide}`}
              className="absolute inset-0 w-full h-full"
              variants={rightImageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <img
                src="/carousel.jpg"
                alt={`Slide ${currentSlide + 1} Right`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 lg:left-10 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${index === currentSlide ? 'bg-indigo-500' : 'bg-gray-300 border border-black'
              }`}
          />
        ))}
      </div>

    </div>
  );
};

export default DualImageCarousel;