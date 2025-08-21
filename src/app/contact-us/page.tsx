"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[()\-\s\d]{7,20}$/;

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot: string; 
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const ContactPage = () => {

  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [banner, setBanner] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
    );

    gsap.fromTo(
      infoRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.5, ease: "power3.out" }
    );

    gsap.fromTo(
      formContainerRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.7, ease: "power3.out" }
    );

    gsap.utils.toArray(".animate-on-scroll").forEach((element: any) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const validate = (state: FormState): FieldErrors => {
    const e: FieldErrors = {};
    if (!state.name.trim()) e.name = "Full name is required.";
    if (!emailRegex.test(state.email.trim())) e.email = "Enter a valid email.";
    if (state.phone.trim() && !phoneRegex.test(state.phone.trim())) e.phone = "Enter a valid phone.";
    if (state.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    if (state.honeypot) e.honeypot = "Spam detected.";
    return e;
    };

  const handleChange =
    (key: keyof FormState) =>
    (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((s) => ({ ...s, [key]: ev.target.value }));
      if (errors[key]) {
        
        setErrors((e) => {
          const { [key]: _, ...rest } = e;
          return rest;
        });
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBanner(null);

    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    gsap.to(formRef.current, {
      y: -10,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });

    try {
      setSubmitting(true);
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined, 
          message: form.message.trim(),
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data?.error || "Failed to send email.");
      }

      setBanner({ type: "success", text: "Thanks! Your message has been sent." });
      setForm({ name: "", email: "", phone: "", message: "", honeypot: "" });
    } catch (err: any) {
      setBanner({ type: "error", text: err?.message || "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | BrandMaska</title>
        <meta
          name="description"
          content="Get in touch with BrandMaska - Creative agency with tech power"
        />
      </Head>

      <div ref={containerRef} className="min-h-screen bg-white pt-14 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h1 ref={headingRef} className="text-4xl sm:text-5xl font-bold text-center mb-16 text-black">
            Let&apos;s <span className="text-yellow-500">Connect</span>
          </h1>

          {banner && (
            <div
              role="alert"
              className={`mb-8 rounded-lg p-4 border ${
                banner.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              {banner.text}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
            <div ref={infoRef} className="space-y-8">
              <motion.div
                className="animate-on-scroll"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-black">Get in touch</h2>
                <p className="text-gray-700 mb-8">
                  Have a project in mind? Want to explore how we can help your brand? Reach out to us
                  and let&apos;s create something amazing together.
                </p>
              </motion.div>

              <motion.div
                className="animate-on-scroll"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Bengaluru Office</h3>
                <p className="text-gray-700">
                  3rd Floor, Room no 29, P2 Unispace
                  <br />
                  EPIP Zone Whitefield Road, Brookefield
                  <br />
                  Bengaluru, Karnataka 560066
                </p>
              </motion.div>

              <motion.div
            ref={mapRef}
            className="mt-10 rounded-2xl overflow-hidden shadow-xl animate-on-scroll"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full h-120 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d43987.52955780919!2d77.68836618556982!3d12.972807599101074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x3bae13da1086999f%3A0x2dbae0abf3477c3c!2s3rdFloor%2C%20Room%20no%2029%2C%20P2%20unispace%2C%20Plot%20No%3A%20128%2C%20EPIP%20Zone%20Whitefield%20Rd%2C%20near%20Ginger%20Hotel%2C%20EPIP%20Zone%2C%20Brookefield%2C%20Bengaluru%2C%20Karnataka%20560066!3m2!1d12.9727027!2d77.7177753!4m0!5e0!3m2!1sen!2sin!4v1755696424864!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>
          </motion.div>
            </div>

            <motion.div
              ref={formContainerRef}
              className="bg-[#2c313f] p-8 rounded-2xl shadow-xl animate-on-scroll"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
          
                <input
                  type="text"
                  name="company"
                  autoComplete="off"
                  tabIndex={-1}
                  value={form.honeypot}
                  onChange={handleChange("honeypot")}
                  className="hidden"
                />

                <motion.div className="animate-on-scroll">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange("name")}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 ${
                      errors.name ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-sm text-red-400">
                      {errors.name}
                    </p>
                  )}
                </motion.div>

                <motion.div className="animate-on-scroll">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange("email")}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="your.email@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-400">
                      {errors.email}
                    </p>
                  )}
                </motion.div>

                <motion.div className="animate-on-scroll">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number <span className="opacity-60">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 ${
                      errors.phone ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="+91 12345 67890"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-2 text-sm text-red-400">
                      {errors.phone}
                    </p>
                  )}
                </motion.div>

                <motion.div className="animate-on-scroll">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange("message")}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 ${
                      errors.message ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Tell us about your project..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-2 text-sm text-red-400">
                      {errors.message}
                    </p>
                  )}
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:bg-yellow-400 transform hover:-translate-y-1 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    <>
                      Send Message
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
          
        </motion.div>
      </div>
    </>
  );
};

export default ContactPage;