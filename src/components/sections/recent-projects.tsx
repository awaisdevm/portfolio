"use client";
import { useState, useRef, type MouseEvent } from "react"

import { PinContainer } from "@/components/ui/Pin"; 
import Image from "next/image";

import { projects } from "@/constants/featuredProjects"; 


export const RecentProjects = () => {
    const [isHovered, setIsHovered] = useState(false)
  
  return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4">
        {projects.map((project) => (
          <div
  key={project.id}
className="min-h-[28rem] sm:min-h-[30rem] lg:min-h-[32.5rem] w-full flex items-center justify-center"
>
            <PinContainer title="Visit" href={project.url}>
              {/* Project Image */}
              

               <div className="group relative aspect-[3/4] overflow-hidden sm:w-96 w-[70vw]">
                       <div
                         className="w-full h-full transition-transform duration-700 ease-in-out"
                         
                       >
                         <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                       </div>
             
                       {/* Top Badges */}
                       <div
                         className="absolute top-4 left-4 right-4 flex justify-between z-20"
                         style={{
                           transform: `translateZ(${isHovered ? "30px" : "0px"})`,
                           transition: "transform 0.5s ease-out",
                         }}
                       >
                         <span className="bg-blue-500/90 text-white px-3 py-1 rounded-full text-xs font-medium ">
                         {/* <span className="bg-blue-500/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"> */}
                           {project.technology}
                         </span>
                         <span className="bg-purple-500/90 text-white px-3 py-1 rounded-full text-xs font-medium ">
                         {/* <span className="bg-purple-500/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"> */}
                           {project.category}
                         </span>
                       </div>
             
                       {/* Hover Gradient Effect */}
                       <div
                         className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-30 transition-all duration-700`}
                         style={{
                           pointerEvents: "none",
                           transform: `translateZ(${isHovered ? "10px" : "0px"})`,
                           transition: "opacity 0.7s ease-out, transform 0.5s ease-out",
                         }}
                       />
             
                       {/* Bottom Info */}
                       <div
                         className="absolute bottom-0 left-0 right-0 z-20"
                         style={{
                           transform: `translateZ(${isHovered ? "40px" : "0px"})`,
                           transition: "transform 0.5s ease-out",
                         }}
                       >
                         <div className="relative px-4 pt-3 pb-4">
                           <div
                             className="absolute inset-0 z-[-1] pointer-events-none"
                             style={{
                               background: "radial-gradient(ellipse at bottom, rgba(0,0,0,0.6), transparent)",
                               filter: "blur(12px)",
                             }}
                           />
             
                           {/* App Name - always visible */}
                           <h3 className="text-white text-center font-semibold text-lg drop-shadow-lg">{project.title}</h3>
             
                           {/* Description & Features - reveal on hover */}
                           <div className="mt-3 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-700 ease-in-out">
                             <p className="text-gray-200 text-sm text-center mb-3 leading-snug">{project.description}</p>
                             <div className="flex flex-wrap justify-center gap-2">
                               {project.tech.map((feature, index) => (
                                 <span
                                   key={index}
                                   className="bg-white/20 text-white px-2 py-1 rounded-md text-xs font-medium"
                                  //  className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium"
                                   style={{
                                     transform: `translateZ(${isHovered ? "5px" : "0px"})`,
                                     transition: `transform 0.5s ease-out ${index * 0.05}s`,
                                   }}
                                 >
                                   {feature}
                                 </span>
                               ))}
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
              
            </PinContainer>
          </div>
        ))}
      </div>
  );
};

