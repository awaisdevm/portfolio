"use client"
import { Button } from "../ui/button"
import { useNav } from "@/app/nav-context"
import { cn } from "@/lib/utils"
import { Protest_Guerrilla } from "next/font/google"
import { AnimatePresence, motion, useScroll } from "framer-motion"
import { Menu, X, Cpu, GithubIcon, Linkedin, Mail } from "lucide-react"
import type React from "react"
import { useState, useEffect } from "react"
import { Magnetic } from "../ui/magnetic"
import portfolioData from "@/data/portfolio.json"
import { ObfuscatedContact } from "../ui/obfuscated-contact"
import { usePathname } from "next/navigation"

const headerIconFont = Protest_Guerrilla({
  subsets: ["latin"],
  weight: ["400"],
})

export const Header: React.FC = () => {
  const { contact } = portfolioData.profile
  const { scrollYProgress } = useScroll()
  const { navItems, mobileMenuOpen, setMobileMenuOpen, activeSection, scrollToSection } = useNav()
  const [visible, setVisible] = useState(true)
  const pathname = usePathname()

  const populatedSocialLinks = [
    { label: "GitHub", href: contact.github, icon: GithubIcon },
    { label: "LinkedIn", href: contact.linkedin, icon: Linkedin },
    { label: "Email", href: `mailto:${contact.email}`, icon: Mail },
  ]

  useEffect(() => {
    return scrollYProgress.onChange((current) => {
      const direction = current - (scrollYProgress.getPrevious() ?? 0)
      setVisible(current < 0.05 || direction < 0)
    })
  }, [scrollYProgress])

  const handleNavClick = (id: string) => {
    scrollToSection(id)
    setMobileMenuOpen(false)
  }

  if (pathname?.startsWith('/wallpaper')) {
    return null
  }

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-500">
      <div className="w-full max-w-7xl mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">
          <Magnetic strength={0.2}>
            <button 
              onClick={() => scrollToSection("home")} 
              className="group relative flex items-center gap-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-all">
                <Cpu className="w-4 h-4 text-primary group-hover:rotate-90 transition-transform duration-500" />
              </div>
              <div className={cn(
                  "text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent",
                  headerIconFont.className
                )}
              >
                M.Awais
              </div>
            </button>
          </Magnetic>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full bg-white/5 border border-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </Button>

          <div className="hidden md:flex justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[5000]">
            <AnimatePresence mode="wait">
              {visible && (
                <motion.nav
                  key="navbar"
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -20, opacity: 0, scale: 0.95 }}
                  className="bg-background/40 backdrop-blur-3xl border border-white/20 shadow-[0_0_30px_rgba(139,92,246,0.3)] px-1.5 py-1.5 rounded-2xl flex items-center space-x-1"
                >
                  {navItems.map((item) => (
                    <Magnetic key={item.id} strength={0.15}>
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className={cn(
                          "relative px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300",
                          activeSection === item.id ? "text-primary" : "text-gray-400 hover:text-primary/70"
                        )}
                      >
                        {item.label}
                        {activeSection === item.id && (
                          <motion.div
                            layoutId="active-tab-indicator"
                            className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl z-[-1] shadow-[inset_0_0_15px_rgba(139,92,246,0.2)]"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          >
                            <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-4 h-[2px] bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)] rounded-full" />
                          </motion.div>
                        )}
                      </button>
                    </Magnetic>
                  ))}

                  <div className="flex items-center space-x-1 ml-4 pl-4 border-l border-white/10">
                    {populatedSocialLinks.map((social) => (
                      <Magnetic key={social.label} strength={0.3}>
                        {social.label === "Email" ? (
                          <ObfuscatedContact
                            type="email"
                            value={contact.email}
                            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-primary/20 transition-all group"
                          >
                            <social.icon className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                          </ObfuscatedContact>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 rounded-xl hover:bg-primary/20 transition-all group"
                            asChild
                          >
                            <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${social.label} profile`}>
                              <social.icon className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                            </a>
                          </Button>
                        )}
                      </Magnetic>
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
                className="p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 text-white hover:scale-105 hover:bg-white/20 transition-all duration-300 flex flex-col items-center space-y-2 animate-in fade-in-0 zoom-in-95 fade-in slide-in-from-right-4 duration-500"
                style={{ 
                  "--delay": `${index * 150}ms`,
                  animationDelay: "var(--delay)"
                } as React.CSSProperties}
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
              social.label === "Email" ? (
                <ObfuscatedContact
                  key={social.label}
                  type="email"
                  value={contact.email}
                  className="p-4 rounded-full border border-gray-700/60 backdrop-blur-sm hover:scale-110 hover:rotate-6 transition-all duration-300 hover:bg-gray-700/40 group flex items-center justify-center"
                >
                  <social.icon className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-200" />
                </ObfuscatedContact>
              ) : (
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
                  <social.icon className="w-6 h-6  text-white group-hover:text-primary transition-colors duration-200" />
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
