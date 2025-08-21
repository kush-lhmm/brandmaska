"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={[
          "inline-flex items-center gap-2 px-3 py-2 rounded-md relative",
          isActive
            ? "text-[#2c313f] font-semibold"
            : "text-[#2c313f]/80 hover:text-[#2c313f] hover:bg-[#2c313f]/5",
          "tracking-tight transition-colors motion-safe:transition-all motion-safe:duration-150",
          "motion-safe:hover:scale-[1.02] active:scale-95",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2c313f]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
          "after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px]",
          isActive
            ? "after:bg-[#2c313f]"
            : "after:bg-transparent hover:after:bg-[#2c313f]/70 motion-safe:hover:after:scale-x-100",
          "after:origin-left after:scale-x-0 motion-safe:after:transition-transform motion-safe:after:duration-200",
        ].join(" ")}
        onClick={() => setOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="bg-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
       
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" aria-label="BrandMaska Home">
              <Image src="/logo.png" alt="Logo" width={160} height={60} priority />
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 mx-2">
            {navItems.map((n) => (
              <NavLink key={n.href} href={n.href} label={n.label} />
            ))}
          </div>

          <div className="md:hidden">
            <button
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              className="text-[#2c313f] focus:outline-none focus-visible:ring focus-visible:ring-[#2c313f]/30 rounded-md p-2"
              onClick={() => setOpen(true)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m0 6H8" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              key="drawer"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-[#2c313f]/10">
                <button
                  ref={closeBtnRef}
                  aria-label="Close menu"
                  className="text-[#2c313f] focus:outline-none focus-visible:ring focus-visible:ring-[#2c313f]/30 rounded-md p-2"
                  onClick={() => setOpen(false)}
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="space-y-4">
                  {navItems.map((n) => (
                    <li key={n.href}>
                      <NavLink href={n.href} label={n.label} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-4 py-4 border-t border-[#2c313f]/10 text-[#2c313f]/70 text-sm">
                © {new Date().getFullYear()} BrandMaska
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;