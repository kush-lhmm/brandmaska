"use client";

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Head from 'next/head';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const ContactPage = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const formContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

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

        // Animate info section
        gsap.fromTo(infoRef.current,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' }
        );

        // Animate form container
        gsap.fromTo(formContainerRef.current,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.8, delay: 0.7, ease: 'power3.out' }
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic would go here
        console.log('Form submitted');

        // Animation for form submission
        gsap.to(formRef.current, {
            y: -10,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut"
        });
    };

    return (
        <>
            <Head>
                <title>Contact Us | BrandMaska</title>
                <meta name="description" content="Get in touch with BrandMaska - Creative agency with tech power" />
            </Head>

            <div ref={containerRef} className="min-h-screen bg-white pt-14 pb-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-7xl mx-auto"
                >
                    <h1 ref={headingRef} className="text-4xl sm:text-5xl font-bold text-center mb-16 text-black">
                        Let's <span className="text-yellow-500">Connect</span>
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div ref={infoRef} className="space-y-8">
                            <motion.div
                                className="animate-on-scroll"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <h2 className="text-2xl font-bold mb-6 text-black">Get in touch</h2>
                                <p className="text-gray-700 mb-8">
                                    Have a project in mind? Want to explore how we can help your brand?
                                    Reach out to us and let's create something amazing together.
                                </p>
                            </motion.div>

                            <motion.div
                                className="animate-on-scroll"
                                whileHover={{ x: 10 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Bengaluru Office</h3>
                                <p className="text-gray-700">
                                    3rd Floor, Room no 29, P2 Unispace<br />
                                    EPIP Zone Whitefield Road, Brookefield<br />
                                    Bengaluru, Karnataka 560066
                                </p>
                            </motion.div>

                            <motion.div
                                className="animate-on-scroll"
                                whileHover={{ x: 10 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Phone</h3>
                                <p className="text-gray-700">+91 89541 24805</p>
                            </motion.div>

                            <motion.div
                                className="animate-on-scroll"
                                whileHover={{ x: 10 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Email</h3>
                                <p className="text-gray-700">hello@brandmaska.com</p>
                            </motion.div>

                            {/* Decorative elements */}
                            <motion.div
                                className="mt-12 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-500 animate-on-scroll"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                <h3 className="text-lg font-semibold text-black mb-2">Why work with us?</h3>
                                <p className="text-gray-700">
                                    We combine creative thinking with technical expertise to deliver
                                    solutions that not only look great but perform exceptionally.
                                </p>
                            </motion.div>
                        </div>

                        {/* Contact Form Container */}
                        <motion.div
                            ref={formContainerRef}
                            className="bg-[#2c313f] p-8 rounded-2xl shadow-xl animate-on-scroll"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                <motion.div
                                    className="animate-on-scroll"
                                    whileFocus={{ scale: 1.01 }}
                                >
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                                        placeholder="Your name"
                                    />
                                </motion.div>

                                <motion.div
                                    className="animate-on-scroll"
                                    whileFocus={{ scale: 1.01 }}
                                >
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                                        placeholder="your.email@example.com"
                                    />
                                </motion.div>

                                <motion.div
                                    className="animate-on-scroll"
                                    whileFocus={{ scale: 1.01 }}
                                >
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                                        placeholder="+91 12345 67890"
                                    />
                                </motion.div>

                                <motion.div
                                    className="animate-on-scroll"
                                    whileFocus={{ scale: 1.01 }}
                                >
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                                        placeholder="Tell us about your project..."
                                    ></textarea>
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    className="w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:bg-yellow-400 transform hover:-translate-y-1 flex items-center justify-center"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Send Message
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Map Section */}
                    <motion.div
                        ref={mapRef}
                        className="mt-20 rounded-2xl overflow-hidden shadow-xl animate-on-scroll"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-full h-96 rounded-2xl overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d43987.52955780919!2d77.68836618556982!3d12.972807599101074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x3bae13da1086999f%3A0x2dbae0abf3477c3c!2s3rdFloor%2C%20Room%20no%2029%2C%20P2%20unispace%2C%20Plot%20No%3A%20128%2C%20EPIP%20Zone%20Whitefield%20Rd%2C%20near%20Ginger%20Hotel%2C%20EPIP%20Zone%2C%20Brookefield%2C%20Bengaluru%2C%20Karnataka%20560066!3m2!1d12.9727027!2d77.7177753!4m0!5e0!3m2!1sen!2sin!4v1755696424864!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-2xl"
                            >
                            </iframe>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
};

export default ContactPage;