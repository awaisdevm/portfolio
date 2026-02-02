"use client"
import { Button } from "../ui/button"
import { contactInfo } from "@/constants/contact"
import { headerContent } from "@/app/data/header-data"
import { useNav } from "@/app/nav-context"
import { cn } from "@/lib/utils"
import { Protest_Guerrilla } from "next/font/google"
import { AnimatePresence, motion, useScroll } from "framer-motion"
import { Menu, X } from "lucide-react"
import type React from "react"
import { useState, useEffect } from "react"

const headerIconFont = Protest_Guerrilla({
  subsets: ["latin"],
  weight: ["400"],
})
export const Header: React.FC = () => {
  const { socialLinks } = headerContent
  const { scrollYProgress } = useScroll()
  const { navItems, mobileMenuOpen, setMobileMenuOpen, activeSection, scrollToSection } = useNav()
  const [visible, setVisible] = useState(true)

  const populatedSocialLinks = socialLinks.map((link) => ({
    ...link,
    href: link.label === "GitHub" ? contactInfo.github : link.label === "LinkedIn" ? contactInfo.linkedin : link.href,
  }))
  useEffect(() => {
    const current = scrollYProgress.get()
    const direction = current - (scrollYProgress.getPrevious() ?? 0)
    setVisible(current < 0.05 || direction < 0)
  }, [scrollYProgress])

  const handleNavClick = (id: string) => {
    scrollToSection(id)
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="w-full max-w-7xl mx-auto px-3 py-2 relative">
        <div className="flex items-center justify-between">
          <a href="">
            <div
              className={cn(
                "text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent animate-pulse",
                headerIconFont.className,
              )}
            >
              M.Awais
            </div>
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="hidden md:flex justify-center absolute left-1/2 top-1/2 mt-1 transform -translate-x-1/2 -translate-y-1/2 z-[5000]">
            <AnimatePresence mode="wait">
              {visible && (
                <motion.nav
                  key="navbar"
                  initial={{ opacity: 1, y: -100 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-600/30 shadow-2xl px-1 py-1 rounded-md flex items-center space-x-0.5"
                  style={{ borderRadius: "8px", backdropFilter: "blur(16px) saturate(180%)" }}
                >
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`relative px-3 py-1 rounded-md font-medium transition-all duration-300 transform hover:scale-105 ${
                        activeSection === item.id ? "text-blue-400" : "text-blue-200 hover:text-cyan-300"
                      }`}
                    >
                      {item.label}
                      {activeSection === item.id && (
                        <motion.span
                          layoutId="active-tab"
                          className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 rounded-full"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}

                  <div className="flex items-center space-x-1 ml-2 pl-2 border-l border-white/20 dark:border-gray-500/30">
                    {populatedSocialLinks.map((social) => (
                      <Button
                        key={social.label}
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 rounded-full hover:scale-110 hover:bg-white/10 transition-all duration-300"
                        asChild
                      >
                        <a href={social.href} target="_blank" rel="noopener noreferrer">
                          <social.icon className="h-3 w-3 text-white/70" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className={`
    md:hidden p-6 m-4 rounded-3xl border backdrop-blur-xl shadow-xl
    border-gray-700/40 bg-gradient-to-br from-gray-900/80 to-gray-800/70
    animate-slide-down-fade transition-all duration-500 ease-in-out
    flex flex-col space-y-6
  `}
        >
          {/* Nav Grid */}
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
          p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm
          rounded-2xl border border-white/20 text-white hover:scale-105
          hover:bg-white/20 transition-all duration-300 flex flex-col items-center
          space-y-2 animate-in fade-in-0 zoom-in-95
        `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t m-12 border-gray-500/30" />

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            {populatedSocialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`
          p-4 rounded-full border border-gray-700/60 backdrop-blur-sm
          hover:scale-110 hover:rotate-6 transition-all duration-300
          hover:bg-gray-700/40 group
        `}
              >
                <social.icon className="w-6 h-6  text-white group-hover:text-blue-400 transition-colors duration-200" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
