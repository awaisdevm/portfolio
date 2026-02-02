import type React from "react"
interface GradientBadgeProps {
  children: React.ReactNode
  className?: string
}

export function GradientBadge({ children, className = "" }: GradientBadgeProps) {
  return (
    <div
      className={`inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full ${className}`}
    >
      <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent font-medium">
        {children}
      </span>
    </div>
  )
}
