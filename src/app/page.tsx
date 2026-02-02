"use client"

import { MainContent } from "@/app/home-page"; 
export default function Portfolio() {

  return (
    <div >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-32 left-32 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-cyan-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-40 w-96 h-96 bg-gradient-to-r from-sky-300/20 to-blue-300/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-300/15 to-sky-200/15 rounded-full blur-3xl" />
        </div>
      </div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 glass-subtle transform rotate-45 rounded-2xl" />
        <div className="absolute top-60 right-32 w-32 h-32 glass-subtle rounded-full" />
        <div className="absolute bottom-40 left-1/3 w-48 h-24 glass-subtle transform -rotate-12 rounded-3xl" />
        <div className="absolute bottom-20 right-20 w-28 h-28 glass-subtle transform rotate-12" />
      </div>

      <MainContent />
    </div>
  );
}
