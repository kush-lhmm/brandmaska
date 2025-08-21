"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Play, Pause, Award, TrendingUp } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    title: "E-commerce Transformation",
    client: "Fashion Retail Brand",
    category: "Digital Transformation",
    year: "2023",
    description: "A complete digital overhaul for a leading fashion retailer, resulting in a 147% increase in online sales and 62% improvement in customer engagement metrics.",
    challenge: "The client was struggling with an outdated e-commerce platform that provided poor user experience and had high cart abandonment rates.",
    solution: "We developed a modern, mobile-first e-commerce solution with personalized recommendations, streamlined checkout process, and integrated inventory management.",
    results: [
      "147% increase in online sales",
      "62% improvement in customer engagement",
      "38% reduction in cart abandonment",
      "92% faster page load times"
    ],
    image: "/carousel.jpg",
    logo: "/carousel.jpg",
    impact: "2.3M",
    impactLabel: "Revenue Generated"
  },
  {
    id: 2,
    title: "Brand Identity Revival",
    client: "Heritage Food Company",
    category: "Brand Strategy",
    year: "2022",
    description: "Reimagining a 50-year-old food brand for the modern consumer while honoring its heritage, resulting in a 89% increase in brand recognition.",
    challenge: "The brand had lost relevance with younger audiences while maintaining strong recognition among older demographics.",
    solution: "We developed a multi-channel brand strategy that balanced nostalgia with modern aesthetics, including packaging redesign, social media presence, and targeted campaigns.",
    results: [
      "89% increase in brand recognition",
      "54% growth in social media engagement",
      "32% increase in sales from target demographic",
      "Award-winning packaging design"
    ],
    image: "/carousel.jpg",
    logo: "/carousel.jpg",
    impact: "89%",
    impactLabel: "Brand Recognition"
  },
  {
    id: 3,
    title: "Mobile App Launch",
    client: "Health & Wellness Startup",
    category: "Product Design",
    year: "2023",
    description: "From concept to launch, we created a holistic health tracking app that gained over 500,000 users in its first year.",
    challenge: "The client needed to enter a crowded market with a unique value proposition and intuitive user experience.",
    solution: "We conducted extensive user research to identify gaps in the market and developed an AI-powered personal health assistant with seamless integration across devices.",
    results: [
      "500,000+ users in first year",
      "4.8-star average app store rating",
      "72% week-over-week retention rate",
      "Featured in Apple's 'App of the Day'"
    ],
    image: "/carousel.jpg",
    logo: "/carousel.jpg",
    impact: "500K+",
    impactLabel: "App Downloads"
  },
  {
    id: 4,
    title: "Corporate Website Redesign",
    client: "Global Tech Company",
    category: "Web Development",
    year: "2022",
    description: "A complete website transformation for a B2B tech company that increased lead generation by 215% and improved accessibility scores to 98%.",
    challenge: "The existing website was not mobile-friendly, had poor SEO performance, and failed to convert visitors into qualified leads.",
    solution: "We designed and developed a responsive, performance-optimized website with clear conversion pathways, interactive elements, and comprehensive accessibility features.",
    results: [
      "215% increase in lead generation",
      "98% accessibility score",
      "45% improvement in SEO rankings",
      "64% faster load times"
    ],
    image: "/carousel.jpg",
    logo: "/carousel.jpg",
    impact: "215%",
    impactLabel: "Lead Generation"
  }
];

const CaseStudy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === caseStudies.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); 
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === caseStudies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? caseStudies.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div 
          className="text-left mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2c313f] mb-6 leading-tight">
            Our Creative Work
          </h1>
          <p className="text-xl text-[#2c313f] max-w-3xl leading-relaxed">
            Explore our portfolio of successful projects and case studies that demonstrate our approach to solving complex creative, media, and technology challenges for global brands.
          </p>
        </motion.div>

        <div className="relative">
        
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all hover:shadow-xl"
            aria-label="Previous case study"
          >
            <ChevronLeft className="w-3 h-3 md:h-6 md:w-6 text-[#2c313f]" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all hover:shadow-xl"
            aria-label="Next case study"
          >
            <ChevronRight className="w-3 h-3 md:h-6 md:w-6 text-[#2c313f]" />
          </button>

          <button
            onClick={toggleAutoPlay}
            className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-2 shadow-lg hover:bg-white transition-all"
            aria-label={isPlaying ? "Pause auto-play" : "Play auto-play"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-[#2c313f]" />
            ) : (
              <Play className="h-5 w-5 text-[#2c313f]" />
            )}
          </button>

          <div className="overflow-hidden rounded-2xl bg-[#2c313f] shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col lg:flex-row min-h-[600px]"
              >
            
                <div className="lg:w-1/2 relative">
                  <div 
                    className="h-80 lg:h-full bg-gray-200 relative overflow-hidden"
                    style={{ 
                      backgroundImage: `url(${caseStudies[currentIndex].image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Impact Badge */}
                    <div className="absolute top-6 left-6 bg-white text-gray-800 px-4 py-2 rounded-full font-bold">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-lg">{caseStudies[currentIndex].impact}</span>
                      </div>
                      <div className="text-xs">{caseStudies[currentIndex].impactLabel}</div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="text-left">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                        {caseStudies[currentIndex].category}
                      </span>
                      <span className="text-gray-500 text-sm">{caseStudies[currentIndex].year}</span>
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-200 mb-3 leading-tight">
                      {caseStudies[currentIndex].title}
                    </h2>
                    <p className="text-gray-300 mb-6 text-lg">
                      {caseStudies[currentIndex].client}
                    </p>

                    <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                      {caseStudies[currentIndex].description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h3 className="font-bold text-gray-300 mb-3 flex items-center gap-2">
                          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                          The Challenge
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {caseStudies[currentIndex].challenge}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-300 mb-3 flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          Our Solution
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {caseStudies[currentIndex].solution}
                        </p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="font-bold text-gray-300 mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-[#f0ef2c]" />
                        Key Results
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {caseStudies[currentIndex].results.map((result, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="h-2 w-2 rounded-full bg-[#f0ef2c] mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm font-medium">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.button 
                      className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Full Case Study 
                      <ExternalLink className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 space-x-3">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-8 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-gray-900' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2c313f] mb-2">40+</div>
            <div className="text-gray-600">Global Brands</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2c313f] mb-2">4 Years</div>
            <div className="text-gray-600">Proven Success</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2c313f] mb-2">200%</div>
            <div className="text-gray-600">Avg. Growth</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2c313f] mb-2">95%</div>
            <div className="text-gray-600">Client Retention</div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default CaseStudy;