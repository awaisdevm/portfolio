"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { Terminal, Home, ArrowLeft, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* 404 Visual */}
          <div className="relative inline-block">
            <m.h1 
              className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-pulse"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              404
            </m.h1>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 border border-primary/30 rounded-xl flex items-center justify-center animate-bounce">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter italic">
              Transmission Lost in Deep Space
            </h2>
            <p className="text-gray-400 text-lg font-medium max-w-md mx-auto leading-relaxed">
              The neural path you are seeking does not exist or has been de-indexed from the central architecture.
            </p>
          </div>

          {/* Terminal Mockup */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 font-mono text-left shadow-2xl overflow-hidden max-w-md mx-auto relative group">
            <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="text-[10px] text-gray-500 ml-2 uppercase tracking-widest">System Status: Error 404</span>
            </div>
            <div className="space-y-1 text-sm sm:text-base">
              <p className="text-primary flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span className="text-gray-500">$</span> ping route.active
              </p>
              <p className="text-red-400 animate-pulse">Request timeout for path: {typeof window !== 'undefined' ? window.location.pathname : "/invalid-sector"}</p>
              <p className="text-gray-500">$ <span className="animate-pulse">_</span></p>
            </div>
            
            {/* Gloss Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              className="bg-primary hover:bg-primary/80 text-white rounded-full px-8 py-6 text-lg font-bold group shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              asChild
            >
              <Link href="/">
                <Home className="w-5 h-5 mr-2 group-hover:-translate-y-1 transition-transform" />
                Initialize Main Uplink
              </Link>
            </Button>
            <Button
              variant="outline"
              className="glass border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-bold group"
              onClick={() => typeof window !== 'undefined' && window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Revert Path
            </Button>
          </div>
        </m.div>
      </div>

      {/* Decorative Particles */}
      {mounted && [...Array(6)].map((_, i) => (
        <m.div
          key={i}
          animate={{
            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 10 + 10,
            ease: "linear"
          }}
          style={{
            "--x": Math.random() * 100 + "%",
            "--y": Math.random() * 100 + "%"
          } as React.CSSProperties}
          className="absolute w-1 h-1 bg-primary/40 rounded-full left-[var(--x)] top-[var(--y)]"
        />
      ))}
    </div>
  );
}
