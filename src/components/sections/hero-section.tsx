"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink, Mail, CheckCircle2 } from "lucide-react";
import { useNav } from "@/app/nav-context";
import { LiaHackerrank } from "react-icons/lia";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { systemInitVariants } from "@/lib/animations";
import portfolioData from '@/data/portfolio.json';

export function HeroSection() {
  const { scrollToSection } = useNav();

  // Mouse Parallax Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="home"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col pt-20 sm:pt-28 lg:pt-32 pb-16 relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background HUD Grid Focus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        variants={systemInitVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* LEFT CONTENT */}
        <div className="flex flex-col space-y-10 lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
          <div className="space-y-6">

            <motion.h1
              variants={systemInitVariants}
              className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.15]"
            >
              {/* sr-only: static keyword text for Google indexing — TypewriterEffect is JS-rendered */}
              <span className="sr-only">
                Awais — Senior Android Developer, Flutter Expert &amp; Mobile App Architect
              </span>
              <span className="text-white" aria-hidden="true">I&apos;m {portfolioData.profile.name}</span>
              <br />
              <span className="inline-block mt-2 min-h-[1.2em]" aria-hidden="true">
                <TypewriterEffect
                  words={portfolioData.profile.roles}
                  className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent transform-gpu"
                />
              </span>
              <br />
              <span className="text-gray-200 mt-2 block font-bold" aria-hidden="true">
                {portfolioData.profile.location.split('|')[0].trim()}
              </span>
            </motion.h1>
            <motion.p
              variants={systemInitVariants}
              className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              {portfolioData.profile.tagline}
            </motion.p>
          </div>

          {/* Call To Actions */}
          <motion.div variants={systemInitVariants} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
            <Button
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white border-0 px-8 py-7 rounded-full text-lg font-semibold transition-all shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_-5px_rgba(139,92,246,0.7)] group hover:-translate-y-1 relative overflow-hidden"
              onClick={() => scrollToSection("projects")}
              aria-label="View my featured projects and case studies"
            >
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex items-center">
                View My Work
                <ExternalLink className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </span>
            </Button>
            <Button
              variant="outline"
              className="glass border-2 text-white px-8 py-7 rounded-full text-lg font-semibold transition-all hover:bg-white/10 hover:border-white/40 group relative overflow-hidden"
              onClick={() => scrollToSection("contact")}
              aria-label="Get in touch — contact Muhammad Awais"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center">
                Get in Touch
                <Mail className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </span>
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={systemInitVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-8 opacity-90">
            <div className="flex items-center gap-2 text-sm text-gray-300 font-medium bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5">
              <CheckCircle2 className="w-5 h-5 text-primary animate-pulse" />
              Available for work
            </div>
            <div
              className="flex items-center gap-2 text-sm text-gray-300 font-medium bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5 cursor-pointer hover:bg-white/10 transition-all group"
              onClick={() => window.open(portfolioData.profile.contact.portfolio, "_blank")}
            >
              <LiaHackerrank className="w-6 h-6 text-secondary group-hover:scale-110 group-hover:rotate-12 transition-all" />
              <span className="group-hover:text-white transition-colors">HackerRank Certified</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT CONTENT: Holographic Parallax Card */}
        <motion.div
          variants={systemInitVariants}
          style={{ rotateX, rotateY }}
          className="flex justify-center lg:justify-end lg:col-span-5 order-1 lg:order-2 mt-8 lg:mt-0 relative perspective-[1000px]"
        >
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] xl:max-w-[420px]">

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-[3rem] blur-3xl animate-pulse duration-[4s]" />

            {/* Main Hero Card */}
            <div className="relative aspect-[4/5] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl glass group transform-gpu">
              <Image
                src={portfolioData.profile.heroImage}
                alt={portfolioData.profile.heroImageAlt}
                fill
                priority
                sizes="(max-width: 640px) 320px, (max-width: 1280px) 380px, 420px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent h-[10%] w-full z-10 pointer-events-none"
                animate={{ top: ["-10%", "100%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 pointer-events-none" />
            </div>

            {/* Floating Pills with Parallax Bias */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-10 sm:top-14 -left-6 sm:-left-12 glass-strong px-5 sm:px-6 py-3 sm:py-4 rounded-3xl flex items-center gap-3 shadow-2xl z-20 group"
            >
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary drop-shadow-lg group-hover:scale-110 transition-transform">6+</span>
              <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider leading-tight">Years<br />Experience</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-16 sm:bottom-20 -right-4 sm:-right-8 glass-strong px-5 sm:px-6 py-3 sm:py-4 rounded-3xl flex items-center gap-3 shadow-2xl z-20 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold text-white leading-tight">App Store</span>
                <span className="text-xs font-medium text-gray-300">Published Apps</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
