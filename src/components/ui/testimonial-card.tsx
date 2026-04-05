import React from "react";
import Image from "next/image";
import { Star, BadgeCheck } from "lucide-react";

export interface TestimonialData {
  id: number;
  clientName: string;
  clientRole: string;
  clientImage: string;
  testimonial: string;
  rating: number;
  verified: boolean;
}

interface TestimonialCardProps {
  data: TestimonialData;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ data }) => {
  return (
    <div className="group relative w-full h-full flex flex-col justify-between p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 hover:-translate-y-2 snap-center">
      
      {/* Decorative top gradient glow that appears on hover */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main Content */}
      <div className="flex-1 mb-6">
        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < data.rating
                  ? "fill-blue-400 text-blue-400"
                  : "fill-white/10 text-white/20"
              }`}
            />
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-zinc-300 leading-relaxed text-sm lg:text-base italic">
          &ldquo;{data.testimonial}&rdquo;
        </p>
      </div>

      {/* Author Profile */}
      <div className="flex items-center gap-4 mt-auto">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-500" />
          <Image
            src={data.clientImage}
            alt={data.clientName}
            width={48}
            height={48}
            className="rounded-full border border-white/20 relative z-10"
          />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h4 className="font-semibold text-white tracking-wide">
              {data.clientName}
            </h4>
            {data.verified && (
              <BadgeCheck className="w-4 h-4 text-blue-400" aria-label="Verified Client" />
            )}
          </div>
          <span className="text-xs text-blue-300">
            {data.clientRole}
          </span>
        </div>
      </div>
    </div>
  );
};
