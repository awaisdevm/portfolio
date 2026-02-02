import type React from "react"
interface SectionWrapperProps {
  id: string
  title: string
  subTitle: string
  description: string
  children?: React.ReactNode
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, subTitle, description, children }) => {
  const dividerGradient = "bg-gradient-to-r from-transparent via-white/30 to-transparent"

  return (
    <section id={id} className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className={`w-12 h-px ${dividerGradient}`} />
            <div className="px-4 py-2 bg-white/10 rounded-full border border-white/20">
            {/* <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"> */}
              <p className="text-sm font-bold bg-gradient-to-r from-blue-300 via-sky-400 to-cyan-300 bg-clip-text text-transparent uppercase tracking-wider">
                {subTitle}
              </p>
            </div>
            <div className={`w-12 h-px ${dividerGradient}`} />
          </div>

          <h2 className="text-5xl font-bold mb-6 tracking-wider bg-gradient-to-r from-blue-200 via-sky-300 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
            {title}
          </h2>

          <p className="text-gray-300 text-xl max-w-3xl mx-auto font-serif leading-relaxed italic">{description}</p>

          <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 shadow-lg shadow-blue-500/50" />
        </div>

        {children}
      </div>
    </section>
  )
}
