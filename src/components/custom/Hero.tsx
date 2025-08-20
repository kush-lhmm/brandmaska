"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 bg-white h-[40vh] flex items-center">
            <div className="max-w-7xl mx-auto">
                <motion.h1 
                    className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#2c313f] leading-tight tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Your Partner in Creative, Media &amp; Technology Transformation
                </motion.h1>

                <motion.p 
                    className="mt-4 sm:mt-6 text-base sm:text-lg md:text-2xl lg:text-3xl text-[#2c313f] max-w-2xl sm:max-w-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    We're a team of specialists delivering award-winning results for 40+ global
                    brands—with 4 years of proven success.
                </motion.p>
            </div>
        </section>
    );
};

export default Hero;