"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Header = () => {

  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.1 } }
  };

  return (
    <header className="bg-[#2c313f]">

      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={200} height={200} priority />
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8 mx-2">
            <div
              className="relative"
              onMouseEnter={() => setIsWorkOpen(true)}
              onMouseLeave={() => setIsWorkOpen(false)}
            >
              <button className="flex items-center text-gray-300 hover:text-gray-400 font-medium">
                Work
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${isWorkOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isWorkOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 border border-gray-200"
                  >
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800">Portfolio</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800">Case Studies</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800">Clients</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <button className="flex items-center text-gray-300 hover:text-gray-400 font-medium">
                Solutions
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isSolutionsOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 border border-gray-200"
                  >
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800">Digital Marketing</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800">Creative Solutions</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800">Technology</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <Link href="/about-us" className="flex items-center text-gray-300 hover:text-gray-400 font-medium">
                About Us
              </Link>

            </div>

            <div
              className="relative"
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <button className="flex items-center text-gray-300 hover:text-gray-400 font-medium">
                Resources
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isResourcesOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 border border-gray-200"
                  >
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800">Blog</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800">Insights</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800">News</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="#" className="text-gray-300 hover:text-gray-400 font-medium">Careers</Link>
            <Link href="contact-us" className="text-gray-300 hover:text-gray-400 font-medium">Contact Us</Link>
          </div>

          <div className="md:hidden">
            <button className="text-gray-300 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;