"use client"

import { useState, useRef, type MouseEvent } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card" 
import { Smartphone, Tv, Brain, Globe, Server } from "lucide-react"
import portfolioData from "@/data/portfolio.json"

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Tv,
  Brain,
  Globe,
  Server
};

type ServiceType = typeof portfolioData.services[0]

interface Service3DCardProps {
  service: ServiceType
}

export function Service3DCard({ service }: Service3DCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
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
  const rotateX = clamped(-(mousePosition.y / 15), -8, 8)
  const rotateY = clamped(mousePosition.x / 15, -8, 8)
  const scale = isHovered ? 1.05 : 1

  // Dynamic holographic shine position
  const shineX = (mousePosition.x + 150) / 3
  const shineY = (mousePosition.y + 200) / 4

  const IconComponent = iconMap[service.iconName] || Smartphone;

  return (
    <a 
      href={`#contact`} 
      onClick={(e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }}
      aria-label={`Inquire about ${service.title} services`}
      className="block w-full h-full"
    >
      <motion.div
        ref={cardRef}
        className="group relative rounded-[2rem] cursor-pointer"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          scale,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        {/* Futuristic Cyber-Borders (SVG Path Tracing) */}
        <div className="absolute inset-0 pointer-events-none z-50">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.rect
              x="1" y="1" width="98" height="98"
              rx="8"
              fill="none"
              stroke="url(#cyber-grad)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: isHovered ? 1 : 0, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Global Atmospheric Glow */}
        <div 
          className="absolute inset-0 rounded-[2rem] bg-primary/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
        />

        {/* Main Card Shell */}
        <Card
          key={service.id}
          className="group relative h-full overflow-hidden border-white/10 backdrop-blur-3xl transition-all duration-700
                     bg-gradient-to-br from-white/10 via-white/5 to-transparent
                     shadow-[0_8px_32px_rgba(0,0,0,0.5)] 
                     group-hover:border-white/30 group-hover:bg-white/[0.12] group-hover:shadow-primary/20"
        >
          {/* Scanning Light Bar Effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-40 opacity-0 group-hover:opacity-100"
            initial={{ translateY: "-100%" }}
            animate={{ translateY: isHovered ? "1000%" : "-100%" }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5, 
              ease: "linear",
              repeatDelay: 0.5 
            }}
          />

          {/* Holographic Mouse Shine */}
          <div 
            className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at ${shineX}px ${shineY}px, rgba(255,255,255,0.08) 0%, transparent 70%)`
            }}
          />

          {/* Icon Space-Lift (Higher translateZ) */}
          <div className="absolute top-4 right-4 w-24 h-24 opacity-5 z-0 transition-transform duration-500 group-hover:scale-125 group-hover:-translate-x-2 group-hover:translate-z-[60px]">
            <IconComponent className="w-full h-full text-white" />
          </div>

          <CardContent className="relative p-8 z-20 h-full flex flex-col justify-between">
            <div className="flex flex-col">
              <motion.div 
                className="relative mb-6 w-16 h-16"
                animate={{ translateZ: isHovered ? 40 : 0 }}
              >
                <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative inline-flex items-center justify-center w-full h-full bg-white/10 rounded-2xl border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  <IconComponent className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
              </motion.div>

              <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-secondary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300">
                {service.title}
              </h3>

              <p className="text-gray-300 mb-8 font-medium leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
                {service.description}
              </p>
            </div>

            <div className="space-y-6">
              {/* Technology Tags with Staggered Entrance feel */}
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0.6, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-3 py-1.5 text-[10px] font-bold tracking-widest bg-white/5 uppercase text-gray-400 rounded-lg border border-white/10 
                             group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300 scale-95 hover:scale-105"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Feature Tags appearing with 'System Boot' look */}
              <motion.div
                className="space-y-3 overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "circOut" }}
              >
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center text-xs font-bold tracking-tight text-white/70 group-hover:text-white transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mr-3 shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                    {feature}
                  </div>
                ))}
              </motion.div>
            </div>
          </CardContent>
        </Card>

        {/* Ambient Corner Particles Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity">
            <div className="absolute top-4 left-4 w-1 h-1 bg-primary rounded-full animate-pulse" />
            <div className="absolute bottom-12 right-6 w-1 h-1 bg-secondary rounded-full animate-pulse delay-700" />
            <div className="absolute top-1/2 right-4 w-0.5 h-0.5 bg-accent rounded-full animate-pulse delay-1000" />
        </div>
      </motion.div>
    </a>
  )
}
