'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const LogoMarquee = () => {

  const logos = [
  { id: 1, src: '/aashirvaad.webp', alt: 'Aashirvaad' },
  { id: 2, src: '/vivel.webp', alt: 'Vivel' },
  { id: 3, src: '/aiib.webp', alt: 'AIIB' },
  { id: 4, src: '/tata-sampann.webp', alt: 'Tata Sampann' },
  { id: 5, src: '/engage.webp', alt: 'Engage' },
  { id: 6, src: '/yippee.webp', alt: 'YiPPee!' },
  { id: 7, src: '/fiama.webp', alt: 'Fiama' },
  { id: 8, src: '/philips.webp', alt: 'Philips' },
  { id: 9, src: '/boat.webp', alt: 'boAt' },
  { id: 10, src: '/itc.webp', alt: 'ITC' },
  { id: 11, src: '/dark-fantasy.webp', alt: 'Dark Fantasy' },
  { id: 12, src: '/bsc.webp', alt: 'Bombay Shaving Company' },
  { id: 13, src: '/britannia.webp', alt: 'Britannia' },
  { id: 14, src: '/aon.webp', alt: 'Aon' },
  { id: 15, src: '/amazon.webp', alt: 'Amazon' },
  { id: 16, src: '/sun-pharma.webp', alt: 'Sun Pharma' },
  { id: 17, src: '/ecolink.webp', alt: 'Ecolink' },
];

  return (
    <div className="w-full overflow-hidden py-12">
      <div className="relative">

        <div className="relative mb-8 h-24 overflow-hidden">

          <div className="absolute left-0 top-0 w-24 h-full bg-white z-10" />

          <div className="absolute right-0 top-0 w-24 h-full bg-white z-10" />

          <motion.div
            className="flex"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration:25,
                ease: "linear",
              },
            }}
          >
            {logos.map((logo, index) => (
              <div key={`first-${logo.id}-${index}`} className="flex-shrink-0 mx-8">
                <div className="relative w-40 h-auto p-4 flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={400}
                    height={400}
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
      </div>
    </div>
  );
};

export default LogoMarquee;