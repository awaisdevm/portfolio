"use client"

import { useState, useRef, type MouseEvent } from "react"
import { Card, CardContent } from "@/components/ui/card" 
import type { services } from "@/constants/my-services"

interface Service3DCardProps {
  service: (typeof services)[0]
}

export function Service3DCard({ service }: Service3DCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = e.clientX - centerX
    const y = e.clientY - centerY

    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setIsHovered(false)

    // Smoothly animate back to center using requestAnimationFrame
    const steps = 18
    let frame = 0
    const startX = mousePosition.x
    const startY = mousePosition.y

    const animate = () => {
      frame++
      const progress = frame / steps
      setMousePosition({
        x: startX * (1 - progress),
        y: startY * (1 - progress),
      })

      if (frame < steps) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }

  const clamped = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val))
  const rotateX = clamped(-(mousePosition.y / 10), -10, 10)
  const rotateY = clamped(mousePosition.x / 10, -10, 10)
  const scale = isHovered ? 1.05 : 1

  return (
    <a href={service.description} target="_blank" rel="noopener noreferrer">
      <div
        ref={cardRef}
        className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
          transformStyle: "preserve-3d",
          transition: isHovered ? "none" : "transform 0.5s ease-out, box-shadow 0.3s ease-out",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10 shadow-2xl shadow-blue-500/10 z-0 
                        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent before:opacity-50"
        /> 
        {/* <div
          className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-blue-500/10 z-0 
                        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent before:opacity-50"
        /> */}

        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-blue-400/30 via-sky-400/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
          <div className="w-full h-full rounded-2xl bg-transparent" />
        </div>

       
        {/* Main Card */}
        <Card
          key={service.id}
          className="group relative overflow-hidden border-0 transition-all duration-500 cursor-pointer
                     bg-gradient-to-br from-white/10 via-white/5 to-transparent
                     shadow-[0_8px_32px_rgba(31,38,135,0.37)] 
                     hover:shadow-[0_8px_32px_rgba(31,38,135,0.6)]
                     hover:scale-[1.02] hover:bg-gradient-to-br hover:from-white/15 hover:via-white/8 hover:to-white/5"
            //  className="group relative overflow-hidden border-0 backdrop-blur-xl transition-all duration-500 cursor-pointer
            //          bg-gradient-to-br from-white/10 via-white/5 to-transparent
            //          shadow-[0_8px_32px_rgba(31,38,135,0.37)] 
            //          hover:shadow-[0_8px_32px_rgba(31,38,135,0.6)]
            //          hover:scale-[1.02] hover:bg-gradient-to-br hover:from-white/15 hover:via-white/8 hover:to-white/5"
          onMouseEnter={() => setHoveredService(service.id)}
          onMouseLeave={() => setHoveredService(null)}
          style={{ animationDelay: `${1 * 150}ms` }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-sky-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
 <div className="absolute top-2 right-2 w-16 h-16 opacity-5 z-0">
          <service.icon className="w-full h-full text-white" />
        </div>
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" />
            <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-300" />
            <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-cyan-400/20 rounded-full animate-pulse delay-700" />
          </div>

          <CardContent className="relative p-8 z-20">
            <div className="relative mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl shadow-inner border border-white/20 group-hover:bg-white/20 transition-all duration-300">
              {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl shadow-inner border border-white/20 group-hover:bg-white/20 transition-all duration-300"> */}
                <service.icon className="w-8 h-8 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:via-sky-300 group-hover:to-cyan-300 group-hover:bg-clip-text transition-all duration-300">
              {service.title}
            </h3>

            <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-medium bg-white/10 text-gray-200 rounded-full border border-white/20 
                           group-hover:bg-gradient-to-r group-hover:from-blue-500/30 group-hover:to-purple-500/30 
                           group-hover:border-white/30 transition-all duration-300"
                          //  className="px-3 py-1.5 text-xs font-medium bg-white/10 backdrop-blur-sm text-gray-200 rounded-full border border-white/20 
                          //  group-hover:bg-gradient-to-r group-hover:from-blue-500/30 group-hover:to-purple-500/30 
                          //  group-hover:border-white/30 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div
              className={`space-y-3 mb-6 transition-all duration-500 ${
                hoveredService === service.id ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              {service.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mr-3 shadow-lg shadow-blue-500/50" />
                  {feature}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-30"
          style={{
            background: `linear-gradient(135deg, 
                        rgba(255,255,255,${isHovered ? "0.15" : "0"}) 0%, 
                        rgba(255,255,255,${isHovered ? "0.05" : "0"}) 50%, 
                        rgba(0,0,0,${isHovered ? "0.1" : "0"}) 100%)`,
            transition: "background 0.3s ease-out",
          }}
        />
      </div>
    </a>
  )
}
