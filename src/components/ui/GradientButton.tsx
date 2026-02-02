import React from "react";
type AlignOption = "left" | "center" | "right";
interface GradientButtonProps {
  text?: string;
  href?: string;
  align?: AlignOption;
}
export default function GradientButton({
  text = "Explore the Universe",
  href = "#",
  align = "center",
}: GradientButtonProps) {
  const alignmentClasses: Record<AlignOption, string> = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };
  return (
    <div className={`flex flex-wrap gap-3 mt-6 ${alignmentClasses[align] || "justify-center"}`}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <button
          className="relative inline-flex overflow-hidden rounded-lg p-[1px] hover:scale-110 transition-transform"
        >
             <div className="absolute inset-0 animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,#60A5FA,#22D3EE,#60A5FA)]"/>
          
          <span
          
            className="inline-flex h-full w-full items-center justify-center border border-blue-300/30 text-blue-200 px-4 py-2
            gap-2 rounded-lg bg-blue-00 px-4 py-2 text-white text-sm font-medium backdrop-blur-3xl"
          >
            {text}
          </span>
        </button>
      </a>
    </div>
  );
}
