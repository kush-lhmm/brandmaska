'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

const TimerSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stopwatchRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      stopwatchRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        timerRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' },
        '-=0.3'
      )
      .fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.8)' },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f0ef2c] py-12 md:py-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-4">
        
        {/* Stopwatch */}
        <motion.div
          ref={stopwatchRef}
          className="flex justify-center"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Image
            src="/asset-23.png"
            alt="Stopwatch"
            width={300}
            height={300}
            priority
            className="object-cover w-40 md:w-72"
          />
        </motion.div>

        {/* Text */}
        <div
          ref={textRef}
          className="flex flex-col items-center text-center max-w-xl"
        >
          <motion.h2
            className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-[#2c313f]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            READY TO BUILD A PARTNERSHIP THAT&apos;S
            <br />
            <span className="text-[#2c313f]">BUILT TO LAST?</span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-8 text-[#2c313f] italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Let&apos;s create something meaningful — together.
          </motion.p>

          <Link href="/contact-us">
            <motion.button
              ref={buttonRef}
              className="bg-white text-[#2c313f] px-6 sm:px-10 py-3 rounded-full font-semibold shadow-md text-sm sm:text-base cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              REACH OUT!
            </motion.button>
          </Link>
        </div>

        {/* Timer */}
        <motion.div
          ref={timerRef}
          className="flex justify-center"
          whileHover={{ scale: 1.05, rotate: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Image
            src="/asset-3.png"
            alt="Timer"
            width={300}
            height={300}
            priority
            className="object-cover w-40 md:w-72"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TimerSection;