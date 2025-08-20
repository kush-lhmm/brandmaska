'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const Footer = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    const services = [
        "Brand Strategy",
        "Digital Transformation",
        "Creative Design",
        "Technology Solutions"
    ];

    const quickLinks = [
        { name: "About", href: "/about" },
        { name: "Our Work", href: "/work" },
        { name: "Services", href: "/services" },
        { name: "Contact", href: "/contact" }
    ];

    return (
        <footer className="bg-[#2c313f] border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                    className="grid grid-cols-1 lg:grid-cols-4 gap-12"
                >

                    <motion.div variants={fadeIn} className="lg:col-span-2 space-y-6">
                        <div>
                            <Link href="/" className="inline-block">
                                <Image
                                    src="/logo.png"
                                    alt="BrandMaska Logo"
                                    width={180}
                                    height={60}
                                    priority
                                    className="h-12 w-auto"
                                />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-100 leading-tight max-w-md">
                                Your Partner in Creative, Media & Technology Transformation
                            </h3>
                            <p className="text-gray-300 leading-relaxed max-w-md">
                                We're a team of specialists delivering award-winning results for 40+ global brands—with 4 years of proven success.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wider">Our Services</h4>
                            <div className="flex flex-wrap gap-2">
                                {services.map((service) => (
                                    <span
                                        key={service}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeIn} className="space-y-6">
                        <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wider">
                            Quick Links
                        </h4>
                        <nav className="space-y-4">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center text-gray-300 hover:text-gray-400 transition-colors group"
                                >
                                    <span>{link.name}</span>
                                    <ArrowUpRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                        </nav>
                    </motion.div>

                    <motion.div variants={fadeIn} className="space-y-6">
                        <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wider">
                            Get In Touch
                        </h4>

                        <div className="space-y-4">
                            <Link
                                href="tel:+918954124805"
                                className="flex items-center text-gray-300 hover:text-gray-400 transition-colors group"
                            >
                                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-3 group-hover:bg-gray-200 transition-colors">
                                    <Phone className="h-4 w-4 text-black" />
                                </div>
                                <span>+91 89541 24805</span>
                            </Link>

                            <Link
                                href="mailto:contact@brandmaska.com"
                                className="flex items-center text-gray-300 hover:text-gray-400 transition-colors group"
                            >
                                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-3 group-hover:bg-gray-200 transition-colors">
                                    <Mail className="h-4 w-4 text-black" />
                                </div>
                                <span>hello@lhmm.in</span>
                            </Link>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start">
                                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-3 mt-1">
                                    <MapPin className="h-4 w-4 text-black" />
                                </div>
                                <div>
                                    <h5 className="font-medium text-gray-100 mb-1">Bengaluru Office</h5>
                                    <address className="not-italic text-sm text-gray-300 leading-relaxed">
                                        3rd Floor, Room no 29, P2 Unispace<br />
                                        EPIP Zone Whitefield Road, Brookefield<br />
                                        Bengaluru, Karnataka 560066
                                    </address>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-16 pt-8 border-t border-gray-200"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-300">
                            © {new Date().getFullYear()} BrandMaska. All rights reserved.
                        </p>

                        <div className="flex items-center space-x-6">
                            <Link
                                href="/privacy"
                                className="text-sm text-gray-300 hover:text-gray-400 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-sm text-gray-300 hover:text-gray-400 transition-colors"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;