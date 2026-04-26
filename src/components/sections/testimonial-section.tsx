import React, { useRef, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import portfolioData from "@/data/portfolio.json";

export const TestimonialSection = memo(function TestimonialSection() {
  const sectionContent = portfolioData.sections.testimonials;
  const testimonials = portfolioData.testimonials;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <SectionWrapper
      id={sectionContent.id}
      title={sectionContent.title}
      subTitle={sectionContent.subtitle}
      description={sectionContent.description}
    >
      <div className="relative mt-12 group">
        
        {/* Navigation Buttons (Desktop mostly) */}
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-12 z-10 p-2 md:p-3
                     bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 
                     text-white/70 hover:text-white rounded-full 
                     opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:opacity-0
                     hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:border-blue-500/50 hidden md:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 px-4 -mx-4 no-scrollbar"
        >
          {testimonials.map((data) => (
            <div 
              key={data.id} 
              className="flex-none snap-center w-full max-w-[400px]"
            >
              <TestimonialCard data={data} />
            </div>
          ))}
        </div>

        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-12 z-10 p-2 md:p-3
                     bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 
                     text-white/70 hover:text-white rounded-full 
                     opacity-0 group-hover:opacity-100 transition-all duration-300
                     hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:border-blue-500/50 hidden md:flex"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

    </SectionWrapper>
  );
});
