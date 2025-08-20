"use client";

// pages/about.tsx
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Head from 'next/head';
import Image from 'next/image';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate page entrance
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Animate heading
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
    );

    // Animate image
    gsap.fromTo(imageRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.5, ease: 'power3.out' }
    );

    // Animate content
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power3.out' }
    );

    // Scroll animations for elements
    gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
      gsap.fromTo(element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <>
      <Head>
        <title>About Us | BrandMaska</title>
        <meta name="description" content="Learn about BrandMaska - A creative agency with tech power" />
      </Head>

      <div ref={containerRef} className="min-h-screen bg-white pt-6 pb-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h1 ref={headingRef} className="text-4xl sm:text-5xl font-bold text-center mb-16 text-black">
            About <span className="text-yellow-500">BrandMaska</span>
          </h1>

          {/* Centered Image */}
          <motion.div
            ref={imageRef}
            className="relative mb-16 overflow-hidden"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Image src="/team.jpg" alt='BrandMaska Team' width={600} height={600} className='object-contain border-4 border-yellow-500 shadow-md mx-auto rounded-xl' priority />
          </motion.div>

          {/* About Content */}
          <div ref={contentRef} className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12 animate-on-scroll"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-black">Our Story</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                BrandMaska was founded with a simple vision: to bridge the gap between creative storytelling
                and technological innovation. Based in Bengaluru, India's tech capital, we've been helping
                brands transform their digital presence since our inception. Our unique approach combines
                artistic creativity with technical expertise to deliver solutions that are not only visually
                stunning but also technically robust.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Mission Section */}
              <motion.div
                className="bg-yellow-50 p-8 rounded-2xl border-l-4 border-yellow-500 animate-on-scroll"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-500 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-black">Our Mission</h3>
                </div>
                <p className="text-gray-700">
                  To empower businesses with innovative digital solutions that combine cutting-edge technology
                  with compelling design. We strive to create meaningful brand experiences that resonate with
                  audiences and drive measurable results.
                </p>
              </motion.div>

              {/* Vision Section */}
              <motion.div
                className="bg-black p-8 rounded-2xl border-l-4 border-yellow-500 animate-on-scroll"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-500 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                </div>
                <p className="text-gray-300">
                  To be the leading creative technology agency that redefines how brands interact with their
                  audiences in the digital space. We envision a future where technology and creativity merge
                  seamlessly to create transformative experiences.
                </p>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutPage;